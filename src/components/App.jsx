import React, { useState } from "react";
import { AppProvider } from "../context/AppContext";
import HeaderComp from "./HeaderComp";
import BodyComp from "./BodyComp";
import FooterComp from "./FooterComp";
import MovieModal from "./MovieModal";
import WatchlistPage from "./WatchlistPage";
import BrowsePage from "./BrowsePage";

function App() {
  const [showWatchlist, setShowWatchlist] = useState(false);
  const [showBrowse, setShowBrowse] = useState(false);
  const [browseType, setBrowseType] = useState("movie");

  const handleBrowse = (mediaType) => {
    setBrowseType(mediaType);
    setShowBrowse(true);
  };

  return (
    <AppProvider>
      <div className="app-container">
        <HeaderComp 
          onWatchlistClick={() => setShowWatchlist(true)}
          onBrowseMovies={() => handleBrowse("movie")}
          onBrowseTVShows={() => handleBrowse("tv")}
        />
        
        <main className="main-content">
          {showBrowse ? (
            <BrowsePage 
              mediaType={browseType} 
              onClose={() => setShowBrowse(false)} 
            />
          ) : (
            <BodyComp />
          )}
        </main>
        
        <FooterComp />
        
        <MovieModal />
        
        <WatchlistPage 
          isVisible={showWatchlist} 
          onClose={() => setShowWatchlist(false)} 
        />
      </div>
    </AppProvider>
  );
}

export default App;
