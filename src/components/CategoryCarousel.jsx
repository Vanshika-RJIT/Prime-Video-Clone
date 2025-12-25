import React, { useState, useRef } from "react";
import EnhancedContentTile from "./EnhancedContentTile";

function CategoryCarousel({ title, movies, icon }) {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const scrollContainerRef = useRef(null);

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    setCanScrollLeft(container.scrollLeft > 10);
    setCanScrollRight(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 10
    );
  };

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    const scrollAmount = container.clientWidth * 0.8;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  if (!movies || movies.length === 0) return null;

  return (
    <div
      className="category-carousel"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="carousel-header">
        <h2 className="carousel-title">
          {icon && <span className="carousel-icon">{icon}</span>}
          {title}
          <svg className="carousel-arrow" viewBox="0 0 24 24" width="20" height="20">
            <path fill="currentColor" d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/>
          </svg>
        </h2>
      </div>
      
      <div className="carousel-container">
        {isHovering && canScrollLeft && (
          <button
            className="carousel-nav-btn left"
            onClick={() => scroll("left")}
          >
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path fill="currentColor" d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
            </svg>
          </button>
        )}
        
        <ul
          ref={scrollContainerRef}
          className="carousel-list"
          onScroll={handleScroll}
        >
          {movies.map((movie, index) => (
            <EnhancedContentTile
              key={movie.imdbID || index}
              movie={movie}
            />
          ))}
        </ul>
        
        {isHovering && canScrollRight && (
          <button
            className="carousel-nav-btn right"
            onClick={() => scroll("right")}
          >
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path fill="currentColor" d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

export default CategoryCarousel;




