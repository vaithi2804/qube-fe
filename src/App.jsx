import { Routes, Route } from 'react-router-dom';
import AlbumOverview from './pages/albumOverview';
import AlbumDetails from './pages/albumDetails';

function App() {
  return (
    <Routes>
      <Route path="/" element={<AlbumOverview />} />
      <Route path="/details/:id" element={<AlbumDetails />} />
    </Routes>
  );
}

export default App;
