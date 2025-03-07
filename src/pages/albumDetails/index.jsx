import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAlbumDetails } from '../../api/api';
import '../../Css/albumDetails.css';
import NavBarComponent from '../../components/NavBar';
import StatusCard from '../../components/StatusCard';
import Loader from '../../components/Loader';
import CommonTable from '../../components/AlbumTable';

function AlbumDetails() {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAlbumDetails() {
      try {
        setLoading(true);
        const data = await getAlbumDetails(id);
        setAlbum(data);
      } catch (error) {
        console.error('Error fetching album details:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchAlbumDetails();
  }, [id]);

  const formatSize = (bytes) => {
    return bytes < 1024 * 1024
      ? `${(bytes / 1024).toFixed(2)} KB`
      : `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const columns = [
    { key: 'title', label: 'Song' },
    { 
      key: 'performers', 
      label: 'Performers', 
      render: (value) => value.length > 1 
      ? value.slice(0, -1).join(', ') + ' & ' + value[value.length - 1] 
      : value[0] 
    },
    { key: 'durationInSeconds', render: (value) => formatDuration(value), label: 'Duration' },
    { 
      key: 'sizeInBytes', 
      label: 'Size', 
      render: (value) => formatSize(value) 
    }
  ];

  if (loading) return <Loader />;
  if (!album) return <h2>Something went wrong. Try again later.</h2>;

  return (
    <div>
      <div className="mt-2 ms-4 ps-2 d-flex">
        <span className="data-txt breadcrumb cursor-pointer" onClick={() => navigate("/")}>
          Overview
        </span>
        <img className="breadcrumb-img mx-2 mt-1" src="../Images/bread-crumb.svg" alt="breadcrumb icon" />
        <span className="breadcrumb">{album.name}</span>
      </div>

      <NavBarComponent heading={album.name} />
      <div className="container-fluid">
      <StatusCard albumDetails={album} />
      <CommonTable data={album.songs} columns={columns}  />
      </div>
    </div>
  );
}

export default AlbumDetails;
