import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ListsProvider } from './context/ListsContext';
import { Members } from './pages/Members';
import { ListDetail } from './pages/ListDetail';
import ListsOverview from './pages/ListsOverview';
import NewList from './pages/NewList';

function App() {
  return (
    <ListsProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/lists" replace />} />
          <Route path="/lists" element={<ListsOverview />} />
          <Route path="/lists/new" element={<NewList />} />
          <Route path="/lists/:listId" element={<ListDetail />} />
          <Route path="/lists/:listId/members" element={<Members />} />
        </Routes>
      </BrowserRouter>
    </ListsProvider>
  );
}

export default App;
