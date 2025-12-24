import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [watchlist, setWatchlist] = useState(() => {
    // Load watchlist from localStorage
    const saved = localStorage.getItem('prime-video-watchlist');
    return saved ? JSON.parse(saved) : [];
  });

  // Save watchlist to localStorage whenever it changes
  const saveWatchlist = (newWatchlist) => {
    localStorage.setItem('prime-video-watchlist', JSON.stringify(newWatchlist));
    setWatchlist(newWatchlist);
  };

  const openModal = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
    document.body.style.overflow = 'unset';
  };

  const addToWatchlist = (movie) => {
    const isAlreadyInWatchlist = watchlist.some(
      (item) => item.imdbID === movie.imdbID
    );

    if (isAlreadyInWatchlist) {
      // Remove from watchlist
      const newWatchlist = watchlist.filter(
        (item) => item.imdbID !== movie.imdbID
      );
      saveWatchlist(newWatchlist);
    } else {
      // Add to watchlist
      const newWatchlist = [...watchlist, movie];
      saveWatchlist(newWatchlist);
    }
  };

  const removeFromWatchlist = (imdbID) => {
    const newWatchlist = watchlist.filter((item) => item.imdbID !== imdbID);
    saveWatchlist(newWatchlist);
  };

  const isInWatchlist = (imdbID) => {
    return watchlist.some((item) => item.imdbID === imdbID);
  };

  const clearWatchlist = () => {
    saveWatchlist([]);
  };

  const value = {
    selectedMovie,
    isModalOpen,
    openModal,
    closeModal,
    searchQuery,
    setSearchQuery,
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
    clearWatchlist,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;
