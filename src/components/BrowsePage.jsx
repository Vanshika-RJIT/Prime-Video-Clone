import React, { useState, useMemo } from "react";
import EnhancedContentTile from "./EnhancedContentTile";
import dataService from "../services/dataService";

function BrowsePage({ mediaType = "movie", onClose }) {
  const [sortBy, setSortBy] = useState("rating");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [minRating, setMinRating] = useState("");

  // Get unique genres and years from data
  const { genres, years } = useMemo(() => {
    const allContent = dataService.getAllContent();
    
    // Extract unique genres
    const genreSet = new Set();
    allContent.forEach(item => {
      if (item.Genre) {
        item.Genre.split(',').forEach(genre => {
          genreSet.add(genre.trim());
        });
      }
    });

    // Extract unique years
    const yearSet = new Set();
    allContent.forEach(item => {
      if (item.Year && item.Year !== 'N/A') {
        const year = item.Year.split('–')[0]; // Handle ranges like "2011–"
        yearSet.add(year);
      }
    });

    return {
      genres: Array.from(genreSet).sort(),
      years: Array.from(yearSet).sort().reverse()
    };
  }, []);

  // Filter and sort results
  const results = useMemo(() => {
    // Start with filtered content by type
    let filtered = dataService.filterContent({
      type: mediaType,
      genre: selectedGenre,
      year: selectedYear,
      minRating: minRating ? parseFloat(minRating) : undefined,
      comingSoon: false
    });

    // Sort results
    switch (sortBy) {
      case 'rating':
        filtered = filtered.sort((a, b) => {
          const ratingA = parseFloat(a.imdbRating) || 0;
          const ratingB = parseFloat(b.imdbRating) || 0;
          return ratingB - ratingA;
        });
        break;
      case 'year':
        filtered = filtered.sort((a, b) => {
          const yearA = parseInt(a.Year) || 0;
          const yearB = parseInt(b.Year) || 0;
          return yearB - yearA;
        });
        break;
      case 'title':
        filtered = filtered.sort((a, b) => 
          (a.Title || '').localeCompare(b.Title || '')
        );
        break;
      case 'votes':
        filtered = filtered.sort((a, b) => {
          const votesA = parseInt(a.imdbVotes?.replace(/,/g, '') || 0);
          const votesB = parseInt(b.imdbVotes?.replace(/,/g, '') || 0);
          return votesB - votesA;
        });
        break;
      default:
        break;
    }

    return filtered;
  }, [mediaType, selectedGenre, selectedYear, minRating, sortBy]);

  return (
    <div className="browse-page">
      <div className="browse-header">
        <h1>
          Browse {mediaType === "movie" ? "Movies" : "TV Shows"}
        </h1>
        <button className="browse-close" onClick={onClose}>
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>
      </div>

      <div className="browse-filters">
        <div className="filter-group">
          <label>Sort By</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="rating">Highest Rated</option>
            <option value="votes">Most Popular</option>
            <option value="year">Newest First</option>
            <option value="title">A to Z</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Genre</label>
          <select 
            value={selectedGenre} 
            onChange={(e) => setSelectedGenre(e.target.value)}
          >
            <option value="">All Genres</option>
            {genres.map(genre => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Year</label>
          <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
            <option value="">All Years</option>
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Min Rating</label>
          <select value={minRating} onChange={(e) => setMinRating(e.target.value)}>
            <option value="">Any Rating</option>
            <option value="7">7+ Stars</option>
            <option value="8">8+ Stars</option>
            <option value="9">9+ Stars</option>
          </select>
        </div>
      </div>

      <div className="browse-results">
        {results.length > 0 ? (
          <>
            <div style={{ padding: '0 72px', marginBottom: '16px', color: 'var(--text-secondary)' }}>
              Showing {results.length} {mediaType === "movie" ? "movies" : "shows"}
            </div>
          <ul className="browse-grid">
              {results.map((item, index) => (
                <EnhancedContentTile
                  key={item.imdbID || index}
                  movie={item}
              />
            ))}
          </ul>
          </>
        ) : (
          <div className="no-results">
            <svg viewBox="0 0 24 24" width="64" height="64">
              <path fill="#555" d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z"/>
            </svg>
            <h3>No results found</h3>
            <p>Try adjusting your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default BrowsePage;

