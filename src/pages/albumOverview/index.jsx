import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllAlbums } from '../../api/api';
import Loader from '../../components/Loader';
import NavBarComponent from '../../components/NavBar';
import CommonTable from '../../components/AlbumTable';
import { formatSize, formatDuration } from '../../utils/utils';

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

  // Column configuration for the album table
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

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true };
    return new Date(dateString).toLocaleDateString('en-GB', options).replace(' ', ' ');
  };

  return (
    <div>

      {/* Navigation bar with page heading */}
      <NavBarComponent heading='Overview'/>

      <div className="container-fluid">
        {/* Show loader while fetching data */}
        {loading ? (
          <Loader />
        ) : error ? (
          <p>Something went wrong. Please try again later.</p>  // Show error message if API call fails
        ) : (
          <CommonTable data={albums} columns={columns} enableSearch enableSort />  // Display albums in a table
        )}
      </div>
    </div>
  );
}

export default AlbumOverview;
