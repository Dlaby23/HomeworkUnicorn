import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useListsContext } from '../context/ListsContext';
import { Button } from '../components/ui/Button';

export function ListDetail() {
  const { listId } = useParams<{ listId: string }>();
  const navigate = useNavigate();
  const {
    lists,
    currentUser,
    addItem,
    toggleItem,
    deleteItem,
    archiveList,
    deleteList,
    leaveList
  } = useListsContext();

  const [menuOpen, setMenuOpen] = useState(false);
  const [newItemInput, setNewItemInput] = useState('');

  const list = lists.find(l => l.id === listId);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.menu-button')) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [menuOpen]);

  if (!list) {
    return (
      <div style={styles.container}>
        <p>List not found</p>
      </div>
    );
  }

  const isOwner = list.owner === currentUser;
  const unresolvedCount = list.items.filter(item => !item.resolved).length;
  const allMembers = [list.owner, ...list.members];

  const handleAddItem = () => {
    if (newItemInput.trim()) {
      addItem(listId!, newItemInput.trim());
      setNewItemInput('');
    }
  };

  const handleArchive = () => {
    archiveList(listId!);
    setMenuOpen(false);
  };

  const handleDelete = () => {
    deleteList(listId!);
    navigate('/lists');
  };

  const handleLeave = () => {
    leaveList(listId!);
    navigate('/lists');
  };

  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMenuOpen(!menuOpen);
  };

  return (
    <div style={styles.container}>
      <Link to="/lists" style={styles.backLink}>
        ← Back to Lists
      </Link>

      <div style={styles.detailHeader}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
          <div>
            <h2 style={styles.detailHeaderH2}>{list.name}</h2>
            <div style={styles.cardMeta}>
              {isOwner ? 'You are the owner' : `Owner: ${list.owner}`}
            </div>
          </div>
          <div className="menu-button" style={styles.menuButton}>
            <Button variant="secondary" size="small" onClick={toggleMenu}>
              ⋮ Menu
            </Button>
            <div style={{
              ...styles.menuDropdown,
              ...(menuOpen ? styles.menuDropdownShow : {})
            }}>
              <div style={styles.menuItem} onClick={() => navigate(`/lists/${listId}/members`)}>
                Manage Members
              </div>
              {isOwner && (
                <div style={styles.menuItem} onClick={handleArchive}>
                  {list.archived ? 'Unarchive List' : 'Archive List'}
                </div>
              )}
              {isOwner && (
                <div style={styles.menuItem} onClick={handleDelete}>
                  Delete List
                </div>
              )}
              {!isOwner && (
                <div style={styles.menuItem} onClick={handleLeave}>
                  Leave List
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div style={styles.detailSection}>
        <h3 style={styles.detailSectionH3}>Members ({allMembers.length})</h3>
        <div style={{ marginBottom: '10px' }}>
          {allMembers.slice(0, 3).map(email => (
            <span key={email} style={styles.badge}>
              {email}
            </span>
          ))}
          {list.members.length > 2 && (
            <span style={styles.badge}>+{list.members.length - 2} more</span>
          )}
        </div>
        <Button variant="outline" size="small" onClick={() => navigate(`/lists/${listId}/members`)}>
          Manage Members
        </Button>
      </div>

      <div style={styles.detailSection}>
        <h3 style={styles.detailSectionH3}>Items ({unresolvedCount} unresolved)</h3>

        <div style={styles.addItemForm}>
          <input
            type="text"
            style={styles.addItemFormInput}
            placeholder="Add new item..."
            value={newItemInput}
            onChange={(e) => setNewItemInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleAddItem();
              }
            }}
          />
          <Button variant="primary" onClick={handleAddItem}>
            Add
          </Button>
        </div>

        <ul style={styles.itemList}>
          {list.items.map(item => (
            <li key={item.id} style={styles.item}>
              <div style={styles.itemCheckbox}>
                <input
                  type="checkbox"
                  checked={item.resolved}
                  onChange={() => toggleItem(listId!, item.id)}
                />
                <span style={item.resolved ? styles.itemResolved : {}}>
                  {item.name}
                </span>
              </div>
              <Button
                variant="danger"
                size="small"
                onClick={() => deleteItem(listId!, item.id)}
              >
                Delete
              </Button>
            </li>
          ))}
          {list.items.length === 0 && (
            <li style={styles.item}>No items yet. Add your first item above!</li>
          )}
        </ul>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
  },
  backLink: {
    display: 'inline-block',
    color: '#007bff',
    textDecoration: 'none',
    marginBottom: '20px',
    fontSize: '14px',
  },
  detailHeader: {
    background: 'white',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  detailHeaderH2: {
    fontSize: '24px',
    marginBottom: '10px',
  },
  cardMeta: {
    fontSize: '14px',
    color: '#666',
  },
  detailSection: {
    background: 'white',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  detailSectionH3: {
    fontSize: '18px',
    marginBottom: '15px',
  },
  itemList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px',
    borderBottom: '1px solid #eee',
  },
  itemCheckbox: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    flex: 1,
  },
  itemResolved: {
    textDecoration: 'line-through',
    color: '#999',
  },
  addItemForm: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
  },
  addItemFormInput: {
    flex: 1,
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '14px',
  },
  badge: {
    display: 'inline-block',
    padding: '4px 8px',
    background: '#007bff',
    color: 'white',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: '500',
    marginRight: '5px',
  },
  menuButton: {
    position: 'relative',
    display: 'inline-block',
  },
  menuDropdown: {
    position: 'absolute',
    right: 0,
    top: '100%',
    background: 'white',
    border: '1px solid #ddd',
    borderRadius: '6px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
    minWidth: '150px',
    marginTop: '5px',
    display: 'none',
    zIndex: 10,
  },
  menuDropdownShow: {
    display: 'block',
  },
  menuItem: {
    padding: '10px 15px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'background 0.2s',
  },
};
