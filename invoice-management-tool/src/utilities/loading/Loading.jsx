import './Loading.css'

export default function Loading () {
    return (
        <div className="loading-container" aria-label="Loading">
            <div className="spinner"></div>
            <p>Save</p>
        </div>
    );
}