import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllAlbums } from '../api/api';

function Home() {
  const [albums, setAlbums] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAlbums() {
      const data = await getAllAlbums();
      setAlbums(data);
    }
    fetchAlbums();
  }, []);

  return (
    <div>
      <h1>Music Albums</h1>
      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Artist</th>
            <th>Type</th>
            <th>Song Count</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {albums.map(album => (
            <tr key={album.id}>
              <td>{album.name}</td>
              <td>{album.artist}</td>
              <td>{album.type}</td>
              <td>{album.songCount}</td>
              <td>
                <button onClick={() => navigate(`/details/${album.id}`)}>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
