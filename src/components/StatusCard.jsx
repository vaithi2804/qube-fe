import '../Css/statusCard.css';
import '../Css/common.css';

const StatusCard = ({ albumDetails }) => {const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    let result = "";
    if (hours > 0) result += `${hours} hour${hours > 1 ? 's' : ''} `;
    if (minutes > 0) result += `${minutes} minute${minutes > 1 ? 's' : ''} `;
    if (remainingSeconds > 0) result += `${remainingSeconds} second${remainingSeconds > 1 ? 's' : ''}`;

    return result.trim();
};


    const formatSize = (bytes) => {
        return bytes < 1024 * 1024
            ? `${(bytes / 1024).toFixed(2)} KB`
            : `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    };

    const formatDate = (dateString) => {
        const options = {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
        };
        return new Date(dateString).toLocaleDateString('en-GB', options).replace(',', '');
    };

    return (
        <div className="card mt-4 status-card p-3">
            <div className="status-card-container">
                <div className="status-card-item">
                    <p className="status-card-heading">Artist</p>
                    <p className="status-card-text">{albumDetails.artist}</p>
                </div>
                <div className="status-card-item">
                    <p className="status-card-heading">Type</p>
                    <p className="status-card-text">{albumDetails.type}</p>
                </div>
                <div className="status-card-item">
                    <p className="status-card-heading">Song Count</p>
                    <p className="status-card-text">{albumDetails.songCount}</p>
                </div>
                <div className="status-card-item">
                    <p className="status-card-heading">Total Size</p>
                    <p className="status-card-text">{formatSize(albumDetails.sizeInBytes)}</p>
                </div>
                <div className="status-card-item">
                    <p className="status-card-heading">Total Duration</p>
                    <p className="status-card-text">{formatDuration(albumDetails.durationInSeconds)}</p>
                </div>
                <div className="status-card-item">
                    <p className="status-card-heading">Released On</p>
                    <p className="status-card-text">{formatDate(albumDetails.releasedOn)}</p>
                </div>
            </div>
        </div>
    );
};

export default StatusCard;
