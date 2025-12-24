/**
 * Enhanced Data Service for Local Content Management
 * Provides centralized data access with filtering, searching, and categorization
 */

import contentData from '../data/contentData';
import HomeTileData from '../components/HomeTileData';
import ContentTileData from '../components/ContentTileData';

class DataService {
  constructor() {
    // Combine all content from multiple sources and remove duplicates
    this.allContent = this.combineAndDeduplicate([
      ...contentData,
      ...HomeTileData,
      ...ContentTileData
    ]);
  }

  /**
   * Combine arrays and remove duplicates based on imdbID
   */
  combineAndDeduplicate(data) {
    return data.filter(
      (movie, index, self) =>
        index === self.findIndex((m) => m.imdbID === movie.imdbID)
    );
  }

  /**
   * Get all content
   */
  getAllContent() {
    return this.allContent;
  }

  /**
   * Get content by ID
   */
  getContentById(id) {
    return this.allContent.find((item) => item.id === id || item.imdbID === id);
  }

  /**
   * Get content by type (movie or series)
   */
  getContentByType(type) {
    return this.allContent.filter((item) => item.Type === type);
  }

  /**
   * Get movies (excluding coming soon)
   */
  getMovies() {
    return this.allContent.filter(
      (item) => item.Type === 'movie' && !item.ComingSoon
    );
  }

  /**
   * Get TV series
   */
  getSeries() {
    return this.allContent.filter((item) => item.Type === 'series');
  }

  /**
   * Get coming soon content
   */
  getComingSoon() {
    return this.allContent.filter((item) => item.ComingSoon);
  }

  /**
   * Get content by genre
   */
  getByGenre(genre) {
    return this.allContent.filter((item) =>
      item.Genre?.toLowerCase().includes(genre.toLowerCase())
    );
  }

  /**
   * Get top rated content
   */
  getTopRated(limit = 10) {
    return this.allContent
      .filter((item) => item.imdbRating && item.imdbRating !== 'N/A')
      .sort((a, b) => parseFloat(b.imdbRating) - parseFloat(a.imdbRating))
      .slice(0, limit);
  }

  /**
   * Get award winning content
   */
  getAwardWinners() {
    return this.allContent.filter(
      (item) =>
        item.Awards &&
        !item.Awards.includes('N/A') &&
        item.Awards.toLowerCase().includes('won')
    );
  }

  /**
   * Get content by year
   */
  getByYear(year) {
    return this.allContent.filter((item) =>
      item.Year?.toString().includes(year.toString())
    );
  }

  /**
   * Get recent content (based on release date)
   */
  getRecentContent(limit = 10) {
    return this.allContent
      .filter((item) => item.released && item.released !== 'N/A')
      .sort((a, b) => new Date(b.released) - new Date(a.released))
      .slice(0, limit);
  }

  /**
   * Search content by title, genre, actors, or director
   */
  search(query) {
    if (!query || query.trim() === '') {
      return [];
    }

    const lowerQuery = query.toLowerCase().trim();

    return this.allContent.filter((item) => {
      const title = item.Title?.toLowerCase() || '';
      const genre = item.Genre?.toLowerCase() || '';
      const actors = item.Actors?.toLowerCase() || '';
      const director = item.Director?.toLowerCase() || '';
      const plot = item.Plot?.toLowerCase() || '';

      return (
        title.includes(lowerQuery) ||
        genre.includes(lowerQuery) ||
        actors.includes(lowerQuery) ||
        director.includes(lowerQuery) ||
        plot.includes(lowerQuery)
      );
    });
  }

  /**
   * Get content by rating range
   */
  getByRatingRange(minRating, maxRating = 10) {
    return this.allContent.filter((item) => {
      const rating = parseFloat(item.imdbRating);
      return !isNaN(rating) && rating >= minRating && rating <= maxRating;
    });
  }

  /**
   * Get trending content (simulated - based on rating and votes)
   */
  getTrending(limit = 10) {
    return this.allContent
      .filter(
        (item) =>
          item.imdbRating &&
          item.imdbRating !== 'N/A' &&
          item.imdbVotes &&
          item.imdbVotes !== 'N/A'
      )
      .sort((a, b) => {
        // Calculate trending score based on rating and votes
        const scoreA =
          parseFloat(a.imdbRating) * parseInt(a.imdbVotes.replace(/,/g, ''));
        const scoreB =
          parseFloat(b.imdbRating) * parseInt(b.imdbVotes.replace(/,/g, ''));
        return scoreB - scoreA;
      })
      .slice(0, limit);
  }

  /**
   * Get random content
   */
  getRandom(count = 1) {
    if (!this.allContent || this.allContent.length === 0) {
      return count === 1 ? null : [];
    }
    const shuffled = [...this.allContent].sort(() => 0.5 - Math.random());
    return count === 1 ? shuffled[0] : shuffled.slice(0, count);
  }

  /**
   * Get categorized content for homepage
   */
  getHomepageCategories() {
    const allMovies = this.getMovies();
    const allSeries = this.getSeries();
    
    return {
      hero: this.getRandom(5) || [],
      continueWatching: allMovies.slice(0, 6) || [],
      topRated: this.getTopRated(10) || [],
      popular: allMovies || [],
      series: allSeries || [],
      action: this.getByGenre('Action') || [],
      drama: this.getByGenre('Drama') || [],
      sciFi: this.allContent.filter(
        (item) =>
          item.Genre?.includes('Sci-Fi') || item.Genre?.includes('Fantasy')
      ) || [],
      comingSoon: this.getComingSoon() || [],
      awardWinners: this.getAwardWinners() || [],
      trending: this.getTrending(10) || [],
    };
  }

  /**
   * Filter content by multiple criteria
   */
  filterContent({ type, genre, minRating, year, comingSoon }) {
    let filtered = [...this.allContent];

    if (type) {
      filtered = filtered.filter((item) => item.Type === type);
    }

    if (genre) {
      filtered = filtered.filter((item) =>
        item.Genre?.toLowerCase().includes(genre.toLowerCase())
      );
    }

    if (minRating) {
      filtered = filtered.filter((item) => {
        const rating = parseFloat(item.imdbRating);
        return !isNaN(rating) && rating >= minRating;
      });
    }

    if (year) {
      filtered = filtered.filter((item) =>
        item.Year?.toString().includes(year.toString())
      );
    }

    if (comingSoon !== undefined) {
      filtered = filtered.filter((item) => !!item.ComingSoon === comingSoon);
    }

    return filtered;
  }

  /**
   * Get similar content based on genre and type
   */
  getSimilarContent(contentId, limit = 6) {
    const content = this.getContentById(contentId);
    if (!content) return [];

    const genres = content.Genre?.split(',').map((g) => g.trim().toLowerCase()) || [];

    return this.allContent
      .filter(
        (item) =>
          item.imdbID !== content.imdbID &&
          item.Type === content.Type &&
          genres.some((genre) => item.Genre?.toLowerCase().includes(genre))
      )
      .slice(0, limit);
  }

  /**
   * Get statistics about the content library
   */
  getLibraryStats() {
    return {
      total: this.allContent.length,
      movies: this.getMovies().length,
      series: this.getSeries().length,
      comingSoon: this.getComingSoon().length,
      avgRating: (
        this.allContent
          .filter((item) => item.imdbRating && item.imdbRating !== 'N/A')
          .reduce((sum, item) => sum + parseFloat(item.imdbRating), 0) /
        this.allContent.filter((item) => item.imdbRating && item.imdbRating !== 'N/A')
          .length
      ).toFixed(1),
    };
  }
}

// Create and export a singleton instance
const dataService = new DataService();

export default dataService;

