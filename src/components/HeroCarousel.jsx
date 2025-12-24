import React, { useState, useEffect, useCallback } from "react";
import { useApp } from "../context/AppContext";

function HeroCarousel({ movies = [] }) {
  const { openModal, addToWatchlist, isInWatchlist } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState("next");

  // Ensure movies is an array
  const moviesArray = Array.isArray(movies) ? movies : (movies ? [movies] : []);
  const featuredMovies = moviesArray.slice(0, 6);
  const currentMovie = featuredMovies[currentIndex];

  const goToNext = useCallback(() => {
    if (featuredMovies.length === 0) return;
    setDirection("next");
    setCurrentIndex((prev) => (prev + 1) % featuredMovies.length);
  }, [featuredMovies.length]);

  const goToPrev = useCallback(() => {
    if (featuredMovies.length === 0) return;
    setDirection("prev");
    setCurrentIndex((prev) => 
      prev === 0 ? featuredMovies.length - 1 : prev - 1
    );
  }, [featuredMovies.length]);

  const goToSlide = useCallback((index) => {
    setDirection(index > currentIndex ? "next" : "prev");
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  }, [currentIndex]);

  useEffect(() => {
    if (!isAutoPlaying || featuredMovies.length === 0) return;
    const interval = setInterval(goToNext, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, goToNext, featuredMovies.length]);

  // Return null if no movies AFTER all hooks are called
  if (!featuredMovies || featuredMovies.length === 0) {
    return null;
  }
  
  if (!currentMovie || !currentMovie.Title) {
    return null;
  }

  const inWatchlist = currentMovie.imdbID ? isInWatchlist(currentMovie.imdbID) : false;

  return (
    <section className="hero-carousel">
      <div className="hero-slides">
        {featuredMovies.map((movie, index) => (
          <div
            key={movie.imdbID || index}
            className={`hero-slide ${index === currentIndex ? 'active' : ''} ${direction}`}
          >
            <div className="hero-backdrop">
              <img
                src={movie.images?.[0] || movie.poster}
                alt={movie.Title}
                className="hero-image"
              />
              <div className="hero-gradient-left"></div>
              <div className="hero-gradient-bottom"></div>
              <div className="hero-gradient-vignette"></div>
            </div>
          </div>
        ))}
      </div>

      <div className="hero-content">
        <div className="hero-logo-container">
          <img
            src={currentMovie.images?.[0]}
            alt={currentMovie.Title}
            className="hero-logo"
          />
        </div>
        
        <h1 className="hero-title">{currentMovie.Title}</h1>
        
        <div className="hero-meta">
          <span className="hero-rating">
            <svg viewBox="0 0 24 24" width="18" height="18">
              <path fill="#f5c518" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
            </svg>
            {currentMovie.imdbRating !== "N/A" ? currentMovie.imdbRating : "8.5"}
          </span>
          <span className="hero-year">{currentMovie.Year}</span>
          <span className="hero-runtime">{currentMovie.Runtime}</span>
          <span className="hero-rated-badge">{currentMovie.rated}</span>
          {currentMovie.Type === "series" && (
            <span className="hero-type-badge">Series</span>
          )}
        </div>
        
        <p className="hero-description">
          {currentMovie.Plot?.length > 200 
            ? currentMovie.Plot.substring(0, 200) + "..." 
            : currentMovie.Plot}
        </p>
        
        <div className="hero-genre-tags">
          {currentMovie.Genre?.split(", ").map((genre, i) => (
            <span key={i} className="genre-tag">{genre}</span>
          ))}
        </div>
        
        <div className="hero-actions">
          <button className="hero-btn primary" onClick={() => openModal(currentMovie)}>
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path fill="currentColor" d="M8 5v14l11-7z"/>
            </svg>
            Play Now
          </button>
          <button 
            className={`hero-btn secondary ${inWatchlist ? 'active' : ''}`}
            onClick={() => addToWatchlist(currentMovie)}
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
            {inWatchlist ? 'Added' : 'Watchlist'}
          </button>
          <button className="hero-btn icon-only" onClick={() => openModal(currentMovie)}>
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
            </svg>
          </button>
        </div>
      </div>

      <button className="hero-nav prev" onClick={goToPrev}>
        <svg viewBox="0 0 24 24" width="32" height="32">
          <path fill="currentColor" d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
        </svg>
      </button>
      <button className="hero-nav next" onClick={goToNext}>
        <svg viewBox="0 0 24 24" width="32" height="32">
          <path fill="currentColor" d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/>
        </svg>
      </button>

      <div className="hero-indicators">
        {featuredMovies.map((_, index) => (
          <button
            key={index}
            className={`hero-indicator ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          >
            <div className="indicator-progress"></div>
          </button>
        ))}
      </div>
    </section>
  );
}

export default HeroCarousel;

