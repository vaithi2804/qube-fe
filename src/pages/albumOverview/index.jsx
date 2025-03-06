import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllAlbums } from '../../api/api';
import Loader from '../../components/Loader';
import NavBarComponent from '../../components/NavBar';
import CommonTable from '../../components/AlbumTable';

const AlbumOverview = () => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAlbums() {
      try {
        setLoading(true);
        const data = await getAllAlbums();
        setAlbums(data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchAlbums();
  }, []);

  const columns = [
    { key: 'name', label: 'Collection Name', render: (value, row) => (
        <>
          <strong>{value}</strong>
          <br />
          <small style={{ color: 'gray' }}>{row.artist}</small>
        </>
      )
    },
    { key: 'type', label: 'Type' },
    { key: 'songCount', label: 'Song Count' },
    { key: 'durationInSeconds', label: 'Duration', render: (value) => formatDuration(value) },
    { key: 'sizeInBytes', label: 'Size', render: (value) => formatSize(value) },
    { key: 'releasedOn', label: 'Released On', render: (value) => formatDate(value) },
    { key: 'actions', label: '', render: (_, row) => (
      <span 
        style={{ color: '#025992', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }} 
        onClick={() => navigate(`/details/${row.id}`)}
      >
        <img src="../Images/eye-icon.svg" alt="View" width="16" height="16" />
        <span>View Details</span>
      </span>
    )
  }
  ];

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const formatSize = (bytes) => {
    return bytes < 1024 * 1024
      ? `${(bytes / 1024).toFixed(2)} KB`
      : `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true };
    return new Date(dateString).toLocaleDateString('en-GB', options).replace(' ', ' ');
  };

  return (
    <div>
      <NavBarComponent heading='Overview'/>
      <div className="container-fluid">
        {loading ? (
          <Loader />
        ) : error ? (
          <p>Something went wrong. Please try again later.</p>
        ) : (
          <CommonTable data={albums} columns={columns} enableSearch enableSort enablePagination />
        )}
      </div>
    </div>
  );
}

export default AlbumOverview;
