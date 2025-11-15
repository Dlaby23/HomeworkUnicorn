import React, { useState, useMemo } from 'react';
import './ShoppingListDetail.css';

// Constants
const CURRENT_USER_ID = "u1";

const INITIAL_LIST = {
  id: "list1",
  name: "Weekly Groceries",
  ownerId: "u1",
  members: [
    { id: "u1", name: "Alice Johnson", email: "alice@example.com" },
    { id: "u2", name: "Bob Smith", email: "bob@example.com" }
  ],
  items: [
    { id: "item1", text: "Milk", resolved: false },
    { id: "item2", text: "Bread", resolved: true },
    { id: "item3", text: "Eggs", resolved: false },
    { id: "item4", text: "Cheese", resolved: false },
    { id: "item5", text: "Butter", resolved: true }
  ]
};

type Member = {
  id: string;
  name: string;
  email: string;
};

type Item = {
  id: string;
  text: string;
  resolved: boolean;
};

type ItemFilter = "unresolved" | "all";

const ShoppingListDetail: React.FC = () => {
  // State hooks
  const [listName, setListName] = useState<string>(INITIAL_LIST.name);
  const [members, setMembers] = useState<Member[]>(INITIAL_LIST.members);
  const [items, setItems] = useState<Item[]>(INITIAL_LIST.items);
  const [itemFilter, setItemFilter] = useState<ItemFilter>("unresolved");
  const [newMemberEmail, setNewMemberEmail] = useState<string>("");
  const [newItemText, setNewItemText] = useState<string>("");
  const [hasLeft, setHasLeft] = useState<boolean>(false);

  // Role detection
  const isOwner = useMemo(() => CURRENT_USER_ID === INITIAL_LIST.ownerId, []);

  const isMember = useMemo(() => {
    return members.some(member => member.id === CURRENT_USER_ID) && !isOwner;
  }, [members, isOwner]);

  // Filtered items based on filter
  const visibleItems = useMemo(() => {
    if (itemFilter === "unresolved") {
      return items.filter(item => !item.resolved);
    }
    return items;
  }, [items, itemFilter]);

  // Handler functions
  const handleAddMember = () => {
    if (!newMemberEmail.trim()) return;

    // Check for duplicate email
    if (members.some(member => member.email === newMemberEmail)) {
      alert("This email is already a member of the list");
      return;
    }

    // Add new member
    const newMember: Member = {
      id: "u" + Date.now(),
      name: newMemberEmail.split('@')[0],
      email: newMemberEmail
    };

    setMembers([...members, newMember]);
    setNewMemberEmail("");
  };

  const handleRemoveMember = (memberId: string) => {
    setMembers(members.filter(member => member.id !== memberId));
  };

  const handleLeaveList = () => {
    setMembers(members.filter(member => member.id !== CURRENT_USER_ID));
    setHasLeft(true);
  };

  const handleAddItem = () => {
    const trimmedText = newItemText.trim();
    if (!trimmedText) return;

    const newItem: Item = {
      id: "i" + Date.now(),
      text: trimmedText,
      resolved: false
    };

    setItems([...items, newItem]);
    setNewItemText("");
  };

  const handleRemoveItem = (itemId: string) => {
    setItems(items.filter(item => item.id !== itemId));
  };

  const handleToggleResolved = (itemId: string) => {
    setItems(items.map(item =>
      item.id === itemId ? { ...item, resolved: !item.resolved } : item
    ));
  };

  // Get role display
  const getRoleBadge = () => {
    if (hasLeft) return "Guest";
    if (isOwner) return "Owner";
    if (isMember) return "Member";
    return "Guest";
  };

  return (
    <div className="shopping-list-detail">
      {/* Header */}
      <header className="detail-header">
        <h1>Shopping List Detail</h1>
        <span className={`role-badge role-${getRoleBadge().toLowerCase()}`}>
          {getRoleBadge()}
        </span>
      </header>

      {/* Has Left Message */}
      {hasLeft && (
        <div className="has-left-message">
          You have left this list
        </div>
      )}

      {/* List Name Section */}
      <section className="list-name-section">
        <h2>List Name</h2>
        <input
          type="text"
          value={listName}
          onChange={(e) => setListName(e.target.value)}
          disabled={!isOwner}
          className="list-name-input"
        />
        {!isOwner && (
          <p className="permission-note">Only owner can rename this list</p>
        )}
      </section>

      {/* Two-Column Layout */}
      <div className="two-column-layout">
        {/* Members Section */}
        <section className="members-section">
          <h2>Members ({members.length})</h2>
          <div className="members-list">
            {members.map(member => (
              <div key={member.id} className="member-item">
                <div className="member-info">
                  <span className="member-name">{member.name}</span>
                  <span className="member-email">{member.email}</span>
                  {member.id === INITIAL_LIST.ownerId && (
                    <span className="owner-badge">Owner</span>
                  )}
                </div>
                {isOwner && member.id !== INITIAL_LIST.ownerId && (
                  <button
                    onClick={() => handleRemoveMember(member.id)}
                    className="remove-member-btn"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>

          {isOwner && (
            <div className="add-member-section">
              <input
                type="email"
                placeholder="Enter member email"
                value={newMemberEmail}
                onChange={(e) => setNewMemberEmail(e.target.value)}
                className="member-email-input"
              />
              <button onClick={handleAddMember} className="add-member-btn">
                Add Member
              </button>
            </div>
          )}

          {isMember && !hasLeft && (
            <div className="leave-list-section">
              <button onClick={handleLeaveList} className="leave-list-btn">
                Leave this list
              </button>
            </div>
          )}
        </section>

        {/* Items Section */}
        <section className="items-section">
          <div className="items-header">
            <h2>Items ({visibleItems.length})</h2>
            <div className="filter-controls">
              <button
                className={`filter-btn ${itemFilter === "unresolved" ? "active" : ""}`}
                onClick={() => setItemFilter("unresolved")}
              >
                Unresolved
              </button>
              <button
                className={`filter-btn ${itemFilter === "all" ? "active" : ""}`}
                onClick={() => setItemFilter("all")}
              >
                All
              </button>
            </div>
          </div>

          <div className="items-list">
            {visibleItems.map(item => (
              <div key={item.id} className={`item ${item.resolved ? "resolved" : ""}`}>
                <div className="item-left">
                  <input
                    type="checkbox"
                    checked={item.resolved}
                    onChange={() => handleToggleResolved(item.id)}
                    className="item-checkbox"
                  />
                  <span className="item-text">{item.text}</span>
                </div>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="delete-item-btn"
                >
                  Delete
                </button>
              </div>
            ))}
            {visibleItems.length === 0 && (
              <div className="empty-state">No items to display</div>
            )}
          </div>

          <div className="add-item-section">
            <input
              type="text"
              placeholder="Add new item"
              value={newItemText}
              onChange={(e) => setNewItemText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddItem()}
              className="item-text-input"
            />
            <button
              onClick={handleAddItem}
              disabled={!newItemText.trim()}
              className="add-item-btn"
            >
              Add Item
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ShoppingListDetail;
