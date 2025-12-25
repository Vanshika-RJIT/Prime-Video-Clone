import React, { useState } from "react";
import { useApp } from "../context/AppContext";

function EnhancedContentTile({ movie }) {
  const [isHovering, setIsHovering] = useState(false);
  const { openModal, addToWatchlist, removeFromWatchlist, isInWatchlist } = useApp();

  const inWatchlist = isInWatchlist(movie.imdbID);

  const handleWatchlistClick = (e) => {
    e.stopPropagation();
    if (inWatchlist) {
      removeFromWatchlist(movie.imdbID);
    } else {
      addToWatchlist(movie);
    }
  };

  const handlePlayClick = (e) => {
    e.stopPropagation();
    openModal(movie);
  };

  return (
    <li
      className="enhanced-tile"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={() => openModal(movie)}
    >
      <article className="tile-article">
        <div className="tile-image-container">
          <img
            className="tile-image"
            src={movie.poster}
            alt={movie.Title}
            loading="lazy"
          />
          <div className={`tile-overlay ${isHovering ? 'visible' : ''}`}>
            <div className="tile-play-btn" onClick={handlePlayClick}>
              <svg viewBox="0 0 24 24" width="40" height="40">
                <circle cx="12" cy="12" r="12" fill="rgba(0,0,0,0.6)"/>
                <path fill="white" d="M9.5 7.5v9l7-4.5z"/>
              </svg>
            </div>
          </div>
          {movie.Type === "series" && (
            <span className="tile-badge series">Series</span>
          )}
          {movie.ComingSoon && (
            <span className="tile-badge coming-soon">Coming Soon</span>
          )}
        </div>
        
        <div className={`tile-info ${isHovering ? 'expanded' : ''}`}>
          <h4 className="tile-title">{movie.Title}</h4>
          
          {isHovering && (
            <div className="tile-expanded-info">
              <div className="tile-meta">
                <span className="tile-rating">
                  <svg viewBox="0 0 24 24" width="12" height="12">
                    <path fill="#f5c518" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                  </svg>
                  {movie.imdbRating !== "N/A" ? movie.imdbRating : "8.0"}
                </span>
                <span className="tile-year">{movie.Year}</span>
                <span className="tile-rated">{movie.rated}</span>
              </div>
              <p className="tile-genre">{movie.Genre}</p>
              <div className="tile-actions">
                <button className="tile-action-btn play" onClick={handlePlayClick}>
                  <svg viewBox="0 0 24 24" width="16" height="16">
                    <path fill="currentColor" d="M8 5v14l11-7z"/>
                  </svg>
                </button>
                <button 
                  className={`tile-action-btn watchlist ${inWatchlist ? 'active' : ''}`}
                  onClick={handleWatchlistClick}
                >
                  {inWatchlist ? (
                    <svg viewBox="0 0 24 24" width="16" height="16">
                      <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" width="16" height="16">
                      <path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                    </svg>
                  )}
                </button>
                <button className="tile-action-btn info">
                  <svg viewBox="0 0 24 24" width="16" height="16">
                    <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </article>
    </li>
  );
}

export default EnhancedContentTile;




