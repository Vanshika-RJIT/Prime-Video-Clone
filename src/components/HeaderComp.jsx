import React, { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import Categories from "./Categories";
import Languages from "./Languages";

function Header({ onWatchlistClick }) {
  const { setSearchQuery, watchlist } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(localSearch);
  };

  const handleSearchChange = (e) => {
    setLocalSearch(e.target.value);
    // Real-time search
    if (e.target.value.length > 2) {
      setSearchQuery(e.target.value);
    } else if (e.target.value.length === 0) {
      setSearchQuery("");
    }
  };

  const clearSearch = () => {
    setLocalSearch("");
    setSearchQuery("");
    setSearchOpen(false);
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-inner">
        <div className="header-left">
          <a className="header-logo" href="/">
            <img
                src="https://m.media-amazon.com/images/G/01/digital/video/web/Logo-min.png"
                alt="Prime Video"
            />
          </a>
          
          <nav className="header-nav">
            <ul className="nav-list">
              <li className="nav-item active">
                <a href="/" className="nav-link">
                  <svg viewBox="0 0 24 24" width="18" height="18">
                    <path fill="currentColor" d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                  </svg>
                  Home
                          </a>
                        </li>
              <li className="nav-item has-dropdown">
                <button className="nav-link">
                  <svg viewBox="0 0 24 24" width="18" height="18">
                    <path fill="currentColor" d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z"/>
                  </svg>
                            Movies
                  <svg className="dropdown-arrow" viewBox="0 0 12 7" width="10" height="10">
                    <path fill="currentColor" d="M1 1l5 5 5-5"/>
                  </svg>
                </button>
                <div className="dropdown-menu">
                  <button onClick={() => {}}>All Movies</button>
                  <button onClick={() => {}}>Action</button>
                  <button onClick={() => {}}>Comedy</button>
                  <button onClick={() => {}}>Drama</button>
                  <button onClick={() => {}}>Horror</button>
                  <button onClick={() => {}}>Sci-Fi</button>
                    </div>
                  </li>
              <li className="nav-item has-dropdown">
                <button className="nav-link">
                  <svg viewBox="0 0 24 24" width="18" height="18">
                    <path fill="currentColor" d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.1-.9-2-2-2zm0 14H3V5h18v12z"/>
                  </svg>
                  TV Shows
                  <svg className="dropdown-arrow" viewBox="0 0 12 7" width="10" height="10">
                    <path fill="currentColor" d="M1 1l5 5 5-5"/>
                          </svg>
                </button>
                <div className="dropdown-menu">
                  <button onClick={() => {}}>All Shows</button>
                  <button onClick={() => {}}>Drama</button>
                  <button onClick={() => {}}>Comedy</button>
                  <button onClick={() => {}}>Documentary</button>
                  <button onClick={() => {}}>Reality</button>
                    </div>
                  </li>
              <li className="nav-item has-dropdown">
                <button className="nav-link">
                        Categories
                  <svg className="dropdown-arrow" viewBox="0 0 12 7" width="10" height="10">
                    <path fill="currentColor" d="M1 1l5 5 5-5"/>
                          </svg>
                </button>
                <div className="dropdown-menu categories-dropdown">
                  <div className="dropdown-section">
                    <h4>Genres</h4>
                    <div className="dropdown-grid">
                      {Categories.map((cat) => (
                        <button key={cat.id} onClick={() => {}}>{cat.name}</button>
                      ))}
                    </div>
                        </div>
                  <div className="dropdown-section">
                    <h4>Languages</h4>
                    <div className="dropdown-grid">
                      {Languages.map((lang) => (
                        <button key={lang.id} onClick={() => {}}>{lang.name}</button>
                      ))}
                      </div>
                      </div>
                    </div>
                        </li>
                      </ul>
          </nav>
            </div>

        <div className="header-right">
          <div className={`search-container ${searchOpen ? 'open' : ''}`}>
            <button 
              className="search-toggle" 
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path fill="currentColor" d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
            </button>
            {searchOpen && (
              <form className="search-form" onSubmit={handleSearchSubmit}>
                          <input
                  type="text"
                  placeholder="Search movies, shows, genres..."
                  value={localSearch}
                  onChange={handleSearchChange}
                  autoFocus
                />
                {localSearch && (
                  <button type="button" className="search-clear" onClick={clearSearch}>
                    <svg viewBox="0 0 24 24" width="16" height="16">
                      <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    </svg>
                  </button>
                )}
                    </form>
            )}
                  </div>

          <button className="watchlist-btn" onClick={onWatchlistClick}>
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path fill="currentColor" d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 14h-3v3h-2v-3H8v-2h3v-3h2v3h3v2zm-3-7V3.5L18.5 9H13z"/>
            </svg>
            Watchlist
            {watchlist.length > 0 && (
              <span className="watchlist-count">{watchlist.length}</span>
            )}
          </button>

          <div className="profile-menu">
            <button className="profile-btn">
              <span className="profile-name">You</span>
              <img 
                src="https://m.media-amazon.com/images/G/01/CST/Prism/Avatars/img_profile_avatar_animals_panda_circ.png"
                alt="Profile"
                className="profile-avatar"
              />
            </button>
            <div className="dropdown-menu profile-dropdown">
              <div className="profile-info">
                <img 
                  src="https://m.media-amazon.com/images/G/01/CST/Prism/Avatars/img_profile_avatar_animals_panda_circ.png"
                  alt="Profile"
                />
                <span>Your Account</span>
                </div>
              <button onClick={() => {}}>Account & Settings</button>
              <button onClick={() => {}}>Help</button>
              <button onClick={() => {}}>Watch Anywhere</button>
              <button onClick={() => {}}>Sign Out</button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
