import React from "react";
import "../RecentSearches.css"

const RecentSearches = () => {
  // Get recent searches from localStorage
  const recentSearches =
    JSON.parse(localStorage.getItem("recentSearches")) || [];

  // Render recent searches

  return (
    <div className="card-container">
      <div className="card">
        <h4>Recent Searches: 🔎</h4>
        <ul>
          {recentSearches.slice(-3).map((search, index) => (
            <li key={index}>
              <p>
                Budget: {search.budget}, Country: {search.country}, Skin Concern:{" "}
                {""}
                {search.skinconcern}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RecentSearches;
