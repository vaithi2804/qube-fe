import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAlbumDetails } from '../../api/api';
import '../../Css/albumDetails.css';
import NavBarComponent from '../../components/NavBar';
import StatusCard from '../../components/StatusCard';
import Loader from '../../components/Loader';
import CommonTable from '../../components/AlbumTable';
import { formatDuration, formatSize } from '../../utils/utils';

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

  // Column configuration for the table
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

  // Show loader while fetching data
  if (loading) return <Loader />;

  // Display error message if album data is unavailable
  if (!album) return <h2>Something went wrong. Try again later.</h2>;

  return (
    <div>
      {/* Breadcrumb navigation */}
      <div className="mt-2 ms-4 ps-2 d-flex">
        <span className="data-txt breadcrumb cursor-pointer" onClick={() => navigate("/")}>
          Overview
        </span>
        <img className="breadcrumb-img mx-2 mt-1" src="../Images/bread-crumb.svg" alt="breadcrumb icon" />
        <span className="breadcrumb">{album.name}</span>
      </div>

      {/* Navigation bar with album title */}
      <NavBarComponent heading={album.name} />

      <div className="container-fluid">

        {/* Status card displaying album details */}
        <StatusCard albumDetails={album} />

        {/* Table displaying album songs */}
        <CommonTable data={album.songs} columns={columns} />
      </div>
    </div>
  );
}

export default AlbumDetails;
