import '../Css/loader.css'

const Loader = () => {

    return (
        <div className="overlay">
            <div className="position-absolute top-50 start-50 translate-middle">
                <div
                    className="spinner-border text-dark ms-2"
                    role="status"
                >
                    <span className="visually-hidden" />
                </div>
                <p className="data-label">Loading...</p>
            </div>
        </div>
    )
}

export default Loader