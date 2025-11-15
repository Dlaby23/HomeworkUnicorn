import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ShoppingListDetail from './components/ShoppingListDetail';

// Placeholder components
const ListsOverview = () => <div>Lists Overview Page</div>;
const NewList = () => <div>New List Form Page</div>;
const MembersManagement = () => <div>Members Management Page</div>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/lists/1" replace />} />
        <Route path="/lists" element={<ListsOverview />} />
        <Route path="/lists/new" element={<NewList />} />
        <Route path="/lists/:listId" element={<ShoppingListDetail />} />
        <Route path="/lists/:listId/members" element={<MembersManagement />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
