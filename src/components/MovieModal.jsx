import React, { useEffect } from "react";
import { useApp } from "../context/AppContext";

function MovieModal() {
  const { selectedMovie, isModalOpen, closeModal, addToWatchlist, removeFromWatchlist, isInWatchlist } = useApp();

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [closeModal]);

  if (!isModalOpen || !selectedMovie) return null;

  const inWatchlist = isInWatchlist(selectedMovie.imdbID);

  const handleWatchlistClick = () => {
    if (inWatchlist) {
      removeFromWatchlist(selectedMovie.imdbID);
    } else {
      addToWatchlist(selectedMovie);
    }
  };

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={closeModal}>
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>
        
        <div className="modal-hero">
          <img 
            src={selectedMovie.images?.[0] || selectedMovie.poster} 
            alt={selectedMovie.Title}
            className="modal-hero-image"
          />
          <div className="modal-hero-gradient"></div>
          <div className="modal-hero-content">
            <h1 className="modal-title">{selectedMovie.Title}</h1>
            <div className="modal-meta">
              <span className="modal-rating">
                <svg viewBox="0 0 24 24" width="16" height="16">
                  <path fill="#f5c518" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
                {selectedMovie.imdbRating !== "N/A" ? selectedMovie.imdbRating : "8.0"}
              </span>
              <span className="modal-year">{selectedMovie.Year}</span>
              <span className="modal-runtime">{selectedMovie.Runtime}</span>
              <span className="modal-rated-badge">{selectedMovie.rated}</span>
            </div>
            <div className="modal-actions">
              <button className="modal-play-btn">
                <svg viewBox="0 0 24 24" width="24" height="24">
                  <path fill="currentColor" d="M8 5v14l11-7z"/>
                </svg>
                Play
              </button>
              <button className="modal-trailer-btn">
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path fill="currentColor" d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z"/>
                </svg>
                Trailer
              </button>
              <button 
                className={`modal-watchlist-btn ${inWatchlist ? 'in-watchlist' : ''}`}
                onClick={handleWatchlistClick}
              >
                {inWatchlist ? (
                  <svg viewBox="0 0 24 24" width="20" height="20">
                    <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" width="20" height="20">
                    <path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                  </svg>
                )}
                {inWatchlist ? 'In Watchlist' : 'Watchlist'}
              </button>
            </div>
          </div>
        </div>
        
        <div className="modal-body">
          <div className="modal-info-grid">
            <div className="modal-description">
              <p>{selectedMovie.Plot}</p>
            </div>
            <div className="modal-details">
              <p><span className="detail-label">Director:</span> {selectedMovie.Director}</p>
              <p><span className="detail-label">Cast:</span> {selectedMovie.Actors}</p>
              <p><span className="detail-label">Genre:</span> {selectedMovie.Genre}</p>
              <p><span className="detail-label">Awards:</span> {selectedMovie.Awards}</p>
            </div>
          </div>
          
          {selectedMovie.images && selectedMovie.images.length > 1 && (
            <div className="modal-gallery">
              <h3>Gallery</h3>
              <div className="gallery-grid">
                {selectedMovie.images.slice(1, 5).map((img, index) => (
                  <img key={index} src={img} alt={`Scene ${index + 1}`} className="gallery-image" />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieModal;




