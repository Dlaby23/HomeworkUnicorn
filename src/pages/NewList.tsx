import { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useListsContext } from '../context/ListsContext';
import { Button } from '../components/ui/Button';

export default function NewList() {
  const navigate = useNavigate();
  const { addList, currentUser } = useListsContext();
  const [listName, setListName] = useState('');
  const [memberEmails, setMemberEmails] = useState<string[]>(['']);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Filter out empty email inputs
    const validEmails = memberEmails.filter(email => email.trim() !== '');

    // Create the list
    addList({
      name: listName,
      owner: currentUser,
      members: validEmails,
      items: []
    });

    // Navigate to lists overview
    navigate('/lists');
  };

  const addMemberInput = () => {
    setMemberEmails([...memberEmails, '']);
  };

  const removeMemberInput = (index: number) => {
    // Keep at least one input row
    if (memberEmails.length > 1) {
      setMemberEmails(memberEmails.filter((_, i) => i !== index));
    }
  };

  const updateMemberEmail = (index: number, value: string) => {
    const updated = [...memberEmails];
    updated[index] = value;
    setMemberEmails(updated);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      <Link
        to="/lists"
        style={{
          color: '#007bff',
          textDecoration: 'none',
          fontSize: '14px',
          display: 'inline-flex',
          alignItems: 'center',
          marginBottom: '20px'
        }}
        onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
        onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
      >
        ← Back to Lists
      </Link>

      <div
        style={{
          background: 'white',
          borderRadius: '8px',
          padding: '30px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          maxWidth: '600px'
        }}
      >
        <h2 style={{ marginBottom: '20px' }}>Create New List</h2>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: 500,
                fontSize: '14px'
              }}
            >
              List Name
            </label>
            <input
              type="text"
              value={listName}
              onChange={(e) => setListName(e.target.value)}
              placeholder="Enter list name"
              required
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #ddd',
                borderRadius: '6px',
                fontSize: '14px'
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = '#007bff'}
              onBlur={(e) => e.currentTarget.style.borderColor = '#ddd'}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: 500,
                fontSize: '14px'
              }}
            >
              Invite Members (Email Addresses)
            </label>

            <div>
              {memberEmails.map((email, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    gap: '10px',
                    alignItems: 'flex-end',
                    marginBottom: '10px'
                  }}
                >
                  <div style={{ flex: 1, marginBottom: 0 }}>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => updateMemberEmail(index, e.target.value)}
                      placeholder="email@example.com"
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        border: '1px solid #ddd',
                        borderRadius: '6px',
                        fontSize: '14px'
                      }}
                      onFocus={(e) => e.currentTarget.style.borderColor = '#007bff'}
                      onBlur={(e) => e.currentTarget.style.borderColor = '#ddd'}
                    />
                  </div>
                  <Button
                    type="button"
                    variant="danger"
                    size="small"
                    onClick={() => removeMemberInput(index)}
                    disabled={memberEmails.length === 1}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>

            <Button
              type="button"
              variant="outline"
              size="small"
              onClick={addMemberInput}
              style={{ marginTop: '10px' }}
            >
              + Add Member
            </Button>
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '30px' }}>
            <Button type="submit" variant="primary">
              Create List
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate('/lists')}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
