import React from "react";

const RecentSearches = () => {
  // Get recent searches from localStorage
  const recentSearches =
    JSON.parse(localStorage.getItem("recentSearches")) || [];

  // Render recent searches

  return (
    <div>
      <h4>Recently Searched: 🔎</h4>
      <ul>
        {recentSearches.slice(-3).map((search, index) => (
          <li key={index}>
            <p>Budget: {search.budget}</p>
            <p>Country: {search.country}</p>
            <p>Skin Concern: {search.skinconcern}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentSearches;
