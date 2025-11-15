import { createContext, useContext, useState, ReactNode } from 'react';

// Types
interface Item {
  id: string;
  name: string;
  resolved: boolean;
}

interface ShoppingList {
  id: string;
  name: string;
  owner: string;
  members: string[];
  items: Item[];
  archived?: boolean;
}

interface Store {
  lists: ShoppingList[];
  currentUser: string;
  searchTerm: string;
  filterOwner: 'all' | 'mine' | 'shared';
  showArchived: boolean;
}

// Context value type
interface ListsContextValue extends Store {
  setSearchTerm: (term: string) => void;
  setFilterOwner: (filter: 'all' | 'mine' | 'shared') => void;
  setShowArchived: (show: boolean) => void;
  addList: (list: Omit<ShoppingList, 'id'>) => void;
  deleteList: (listId: string) => void;
  archiveList: (listId: string) => void;
  leaveList: (listId: string) => void;
  addItem: (listId: string, itemName: string) => void;
  toggleItem: (listId: string, itemId: string) => void;
  deleteItem: (listId: string, itemId: string) => void;
  addMember: (listId: string, memberEmail: string) => void;
  removeMember: (listId: string, memberEmail: string) => void;
}

// Mock data
const initialLists: ShoppingList[] = [
  {
    id: '1',
    name: 'Weekly Groceries',
    owner: 'john@example.com',
    members: ['jane@example.com'],
    items: [
      { id: '1', name: 'Milk', resolved: false },
      { id: '2', name: 'Bread', resolved: true },
      { id: '3', name: 'Eggs', resolved: false }
    ],
    archived: false
  },
  {
    id: '2',
    name: 'Party Supplies',
    owner: 'jane@example.com',
    members: ['john@example.com', 'bob@example.com'],
    items: [
      { id: '1', name: 'Balloons', resolved: false },
      { id: '2', name: 'Cake', resolved: false }
    ],
    archived: false
  },
  {
    id: '3',
    name: 'Office Supplies',
    owner: 'john@example.com',
    members: [],
    items: [
      { id: '1', name: 'Pens', resolved: true },
      { id: '2', name: 'Paper', resolved: true },
      { id: '3', name: 'Stapler', resolved: true }
    ],
    archived: true
  }
];

const initialStore: Store = {
  lists: initialLists,
  currentUser: 'john@example.com',
  searchTerm: '',
  filterOwner: 'all',
  showArchived: false
};

// Create context
const ListsContext = createContext<ListsContextValue | undefined>(undefined);

// Provider component
export function ListsProvider({ children }: { children: ReactNode }) {
  const [lists, setLists] = useState<ShoppingList[]>(initialStore.lists);
  const [currentUser] = useState<string>(initialStore.currentUser);
  const [searchTerm, setSearchTerm] = useState<string>(initialStore.searchTerm);
  const [filterOwner, setFilterOwner] = useState<'all' | 'mine' | 'shared'>(initialStore.filterOwner);
  const [showArchived, setShowArchived] = useState<boolean>(initialStore.showArchived);

  // List management functions
  const addList = (list: Omit<ShoppingList, 'id'>) => {
    const newList: ShoppingList = {
      ...list,
      id: Date.now().toString(),
      archived: false
    };
    setLists(prev => [...prev, newList]);
  };

  const deleteList = (listId: string) => {
    setLists(prev => prev.filter(list => list.id !== listId));
  };

  const archiveList = (listId: string) => {
    setLists(prev =>
      prev.map(list =>
        list.id === listId ? { ...list, archived: !list.archived } : list
      )
    );
  };

  const leaveList = (listId: string) => {
    setLists(prev =>
      prev.map(list =>
        list.id === listId
          ? { ...list, members: list.members.filter(m => m !== currentUser) }
          : list
      )
    );
  };

  // Item management functions
  const addItem = (listId: string, itemName: string) => {
    setLists(prev =>
      prev.map(list =>
        list.id === listId
          ? {
              ...list,
              items: [
                ...list.items,
                { id: Date.now().toString(), name: itemName, resolved: false }
              ]
            }
          : list
      )
    );
  };

  const toggleItem = (listId: string, itemId: string) => {
    setLists(prev =>
      prev.map(list =>
        list.id === listId
          ? {
              ...list,
              items: list.items.map(item =>
                item.id === itemId ? { ...item, resolved: !item.resolved } : item
              )
            }
          : list
      )
    );
  };

  const deleteItem = (listId: string, itemId: string) => {
    setLists(prev =>
      prev.map(list =>
        list.id === listId
          ? {
              ...list,
              items: list.items.filter(item => item.id !== itemId)
            }
          : list
      )
    );
  };

  // Member management functions
  const addMember = (listId: string, memberEmail: string) => {
    setLists(prev =>
      prev.map(list =>
        list.id === listId && !list.members.includes(memberEmail)
          ? { ...list, members: [...list.members, memberEmail] }
          : list
      )
    );
  };

  const removeMember = (listId: string, memberEmail: string) => {
    setLists(prev =>
      prev.map(list =>
        list.id === listId
          ? { ...list, members: list.members.filter(m => m !== memberEmail) }
          : list
      )
    );
  };

  const value: ListsContextValue = {
    lists,
    currentUser,
    searchTerm,
    filterOwner,
    showArchived,
    setSearchTerm,
    setFilterOwner,
    setShowArchived,
    addList,
    deleteList,
    archiveList,
    leaveList,
    addItem,
    toggleItem,
    deleteItem,
    addMember,
    removeMember
  };

  return <ListsContext.Provider value={value}>{children}</ListsContext.Provider>;
}

// Hook to use context
export function useListsContext() {
  const context = useContext(ListsContext);
  if (!context) {
    throw new Error('useListsContext must be used within ListsProvider');
  }
  return context;
}
