import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAlbumDetails } from '../api/api';

function Details() {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);

  useEffect(() => {
    async function fetchAlbumDetails() {
      const data = await getAlbumDetails(id);
      setAlbum(data);
    }
    fetchAlbumDetails();
  }, [id]);

  if (!album) return <h2>Loading...</h2>;

  return (
    <div>
      <h1>{album.name}</h1>
      <p><strong>Artist:</strong> {album.artist}</p>
      <p><strong>Type:</strong> {album.type}</p>
      <p><strong>Song Count:</strong> {album.songCount}</p>
    </div>
  );
}

export default Details;
