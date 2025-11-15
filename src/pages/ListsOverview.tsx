import { useNavigate } from 'react-router-dom';
import { useListsContext } from '../context/ListsContext';
import { SearchInput } from '../components/ui/SearchInput';
import { FilterDropdown } from '../components/ui/FilterDropdown';
import { ToggleSwitch } from '../components/ui/ToggleSwitch';
import { Button } from '../components/ui/Button';

const styles = {
  header: {
    background: 'white',
    padding: '20px',
    marginBottom: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap' as const,
    gap: '15px',
  },
  toolbar: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
    flexWrap: 'wrap' as const,
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
    marginBottom: '20px',
  },
  card: {
    background: 'white',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s, box-shadow 0.2s',
    cursor: 'pointer',
  },
  cardTitle: {
    fontSize: '18px',
    fontWeight: 600,
    marginBottom: '10px',
  },
  cardMeta: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '8px',
  },
  cardActions: {
    display: 'flex',
    gap: '10px',
    marginTop: '15px',
  },
};

export default function ListsOverview() {
  const navigate = useNavigate();
  const {
    lists,
    currentUser,
    searchTerm,
    filterOwner,
    showArchived,
    setSearchTerm,
    setFilterOwner,
    setShowArchived,
    deleteList,
  } = useListsContext();

  // Filter logic
  const filteredLists = lists.filter((list) => {
    // Filter by search term
    const matchesSearch =
      searchTerm === '' ||
      list.name.toLowerCase().includes(searchTerm.toLowerCase());

    // Filter by owner
    let matchesOwner = true;
    if (filterOwner === 'mine') {
      matchesOwner = list.owner === currentUser;
    } else if (filterOwner === 'shared') {
      matchesOwner = list.owner !== currentUser && list.members.includes(currentUser);
    }

    // Filter by archived status
    const matchesArchived = showArchived || !list.archived;

    return matchesSearch && matchesOwner && matchesArchived;
  });

  const handleCardClick = (listId: string) => {
    navigate(`/lists/${listId}`);
  };

  const handleDeleteClick = (e: React.MouseEvent, listId: string) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this list?')) {
      deleteList(listId);
    }
  };

  const filterOptions = [
    { value: 'all', label: 'All Lists' },
    { value: 'mine', label: 'My Lists' },
    { value: 'shared', label: 'Shared with Me' },
  ];

  return (
    <>
      <div style={styles.header}>
        <h1>Shopping Lists</h1>
        <div style={styles.toolbar}>
          <SearchInput
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search lists..."
          />
          <FilterDropdown
            value={filterOwner}
            onChange={(value: string) => setFilterOwner(value as 'all' | 'mine' | 'shared')}
            options={filterOptions}
          />
          <ToggleSwitch
            checked={showArchived}
            onChange={setShowArchived}
            label="Show Archived"
          />
          <Button onClick={() => navigate('/lists/new')} variant="primary">
            + New List
          </Button>
        </div>
      </div>

      <div style={styles.container}>
        <div style={styles.grid}>
          {filteredLists.map((list) => {
            const unresolvedCount = list.items.filter((item) => !item.resolved).length;
            const totalCount = list.items.length;
            const isOwner = list.owner === currentUser;

            return (
              <div
                key={list.id}
                style={styles.card}
                onClick={() => handleCardClick(list.id)}
                onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                }}
              >
                <div style={styles.cardTitle}>{list.name}</div>
                <div style={styles.cardMeta}>
                  {isOwner ? 'Owner' : 'Member'} • {list.members.length} member
                  {list.members.length !== 1 ? 's' : ''}
                </div>
                <div style={styles.cardMeta}>
                  {unresolvedCount} / {totalCount} items pending
                </div>
                <div
                  style={styles.cardActions}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Button
                    onClick={() => navigate(`/lists/${list.id}`)}
                    variant="outline"
                    size="small"
                  >
                    View Details
                  </Button>
                  {isOwner && (
                    <Button
                      onClick={(e: React.MouseEvent) => handleDeleteClick(e, list.id)}
                      variant="danger"
                      size="small"
                    >
                      Delete
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
