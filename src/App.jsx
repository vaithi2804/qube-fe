import { Routes, Route } from 'react-router-dom';
import Details from './pages/Details';
import AlbumOverview from './pages/albumOverview';

function App() {
  return (
    <Routes>
      <Route path="/" element={<AlbumOverview />} />
      <Route path="/details/:id" element={<Details />} />
    </Routes>
  );
}

export default App;
