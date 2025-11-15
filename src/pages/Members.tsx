import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useListsContext } from '../context/ListsContext';
import { Button } from '../components/ui/Button';

export function Members() {
  const { listId } = useParams<{ listId: string }>();
  const navigate = useNavigate();
  const { lists, currentUser, addMember, removeMember } = useListsContext();
  const [inviteEmail, setInviteEmail] = useState('');

  const list = lists.find(l => l.id === listId);

  if (!list) {
    return (
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
        <p>List not found</p>
      </div>
    );
  }

  const isOwner = list.owner === currentUser;

  const handleInvite = () => {
    if (inviteEmail.trim()) {
      addMember(listId!, inviteEmail.trim());
      setInviteEmail('');
    }
  };

  const handleRemove = (memberEmail: string) => {
    removeMember(listId!, memberEmail);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <a
        href={`#/lists/${listId}`}
        onClick={(e) => {
          e.preventDefault();
          navigate(`/lists/${listId}`);
        }}
        style={{
          display: 'inline-block',
          marginBottom: '20px',
          color: '#007bff',
          textDecoration: 'none'
        }}
      >
        ← Back to List
      </a>

      <div
        style={{
          background: 'white',
          borderRadius: '8px',
          padding: '30px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
        }}
      >
        <h2 style={{ marginBottom: '20px' }}>Manage Members - {list.name}</h2>

        {/* Owner Section */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ fontSize: '16px', marginBottom: '15px' }}>Owner</h3>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px 0',
              borderBottom: '1px solid #eee'
            }}
          >
            <div>
              <div>{list.owner}</div>
              <div style={{ fontSize: '14px', color: '#666' }}>Owner</div>
            </div>
          </div>
        </div>

        {/* Members Section */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ fontSize: '16px', marginBottom: '15px' }}>
            Members ({list.members.length})
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {list.members.map(email => (
              <li
                key={email}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '10px 0',
                  borderBottom: '1px solid #eee'
                }}
              >
                <div>{email}</div>
                {isOwner && (
                  <Button
                    variant="danger"
                    size="small"
                    onClick={() => handleRemove(email)}
                  >
                    Remove
                  </Button>
                )}
              </li>
            ))}
            {list.members.length === 0 && (
              <li
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '10px 0',
                  borderBottom: '1px solid #eee'
                }}
              >
                No members yet
              </li>
            )}
          </ul>
        </div>

        {/* Invite Section (Owner only) */}
        {isOwner && (
          <div style={{ borderTop: '1px solid #eee', paddingTop: '20px' }}>
            <h3 style={{ fontSize: '16px', marginBottom: '15px' }}>
              Invite New Member
            </h3>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input
                type="email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleInvite();
                  }
                }}
                placeholder="email@example.com"
                style={{
                  flex: '1',
                  padding: '10px 15px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
              />
              <Button variant="success" onClick={handleInvite}>
                Invite
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
