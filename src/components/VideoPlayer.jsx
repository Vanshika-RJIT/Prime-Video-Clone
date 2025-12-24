import React, { useState, useEffect } from "react";
import { getYouTubeTrailerKey } from "../services/tmdbApi";

function VideoPlayer({ videos, isOpen, onClose, title }) {
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    if (videos) {
      const key = getYouTubeTrailerKey(videos);
      setTrailerKey(key);
    }
  }, [videos]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="video-player-overlay" onClick={onClose}>
      <div className="video-player-container" onClick={(e) => e.stopPropagation()}>
        <div className="video-player-header">
          <h3>{title}</h3>
          <button className="video-close-btn" onClick={onClose}>
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        </div>
        
        <div className="video-player-content">
          {trailerKey ? (
            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&rel=0`}
              title={`${title} Trailer`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="no-trailer">
              <svg viewBox="0 0 24 24" width="64" height="64">
                <path fill="#555" d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z"/>
              </svg>
              <p>No trailer available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default VideoPlayer;



