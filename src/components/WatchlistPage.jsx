import React from "react";
import EnhancedContentTile from "./EnhancedContentTile";
import { useApp } from "../context/AppContext";

function WatchlistPage({ isVisible, onClose }) {
  const { watchlist } = useApp();

  if (!isVisible) return null;

  return (
    <div className="watchlist-overlay" onClick={onClose}>
      <div className="watchlist-panel" onClick={(e) => e.stopPropagation()}>
        <div className="watchlist-header">
          <h2>
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
            </svg>
            My Watchlist
          </h2>
          <button className="watchlist-close" onClick={onClose}>
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        </div>
        
        {watchlist.length > 0 ? (
          <ul className="watchlist-grid">
            {watchlist.map((movie, index) => (
              <EnhancedContentTile key={movie.imdbID || index} movie={movie} />
            ))}
          </ul>
        ) : (
          <div className="watchlist-empty">
            <svg viewBox="0 0 24 24" width="80" height="80">
              <path fill="#444" d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 14h-3v3h-2v-3H8v-2h3v-3h2v3h3v2zm-3-7V3.5L18.5 9H13z"/>
            </svg>
            <h3>Your watchlist is empty</h3>
            <p>Add movies and shows to keep track of what you want to watch</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default WatchlistPage;




