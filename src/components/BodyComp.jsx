import React, { useMemo } from "react";
import { useApp } from "../context/AppContext";
import HeroCarousel from "./HeroCarousel";
import CategoryCarousel from "./CategoryCarousel";
import SearchResults from "./SearchResults";
import dataService from "../services/dataService";

function BodyComp() {
  const { searchQuery } = useApp();

  // Use memoization to prevent unnecessary recalculations
  const categories = useMemo(() => dataService.getHomepageCategories(), []);

  // Show search results if searching
  if (searchQuery) {
    return (
      <div className="body-content">
        <SearchResults />
      </div>
    );
  }

  return (
    <div className="body-content">
      {/* Hero Section */}
      <HeroCarousel movies={categories.hero} />

      {/* Continue Watching - simulated */}
      <CategoryCarousel
        title="Continue Watching"
        movies={categories.continueWatching}
        icon="▶"
      />

      {/* Trending Now */}
      <CategoryCarousel
        title="Trending Now"
        movies={categories.trending}
        icon="🔥"
      />

      {/* Top 10 Today */}
      <CategoryCarousel
        title="Top 10 Today"
        movies={categories.topRated}
        icon="⭐"
      />

      {/* Popular Movies */}
      <CategoryCarousel
        title="Popular Movies"
        movies={categories.popular}
        icon="🎬"
      />

      {/* Binge-worthy TV Series */}
      <CategoryCarousel
        title="Binge-worthy TV Series"
        movies={categories.series}
        icon="📺"
      />

      {/* Action & Adventure */}
      <CategoryCarousel
        title="Action & Adventure"
        movies={categories.action}
        icon="💥"
      />

      {/* Drama */}
      <CategoryCarousel
        title="Drama"
        movies={categories.drama}
        icon="🎭"
      />

      {/* Sci-Fi & Fantasy */}
      <CategoryCarousel
        title="Sci-Fi & Fantasy"
        movies={categories.sciFi}
        icon="🚀"
      />

      {/* Coming Soon */}
      {categories.comingSoon.length > 0 && (
        <CategoryCarousel
          title="Coming Soon"
          movies={categories.comingSoon}
          icon="📅"
        />
      )}

      {/* Award Winners */}
      <CategoryCarousel
        title="Award Winning Content"
        movies={categories.awardWinners}
        icon="🏆"
      />
    </div>
  );
}

export default BodyComp;
