import React, { useState, useEffect } from "react";

const RecentSearches = () => {
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    const storedSearches = localStorage.getItem("recentSearches");
    if (storedSearches) {
      setRecentSearches(JSON.parse(storedSearches));
    }
  }, []);

  const handleSearchClick = (search) => {
    setRecentSearches([search, ...recentSearches.slice(0, 2)]);

    localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
  };

  return (
    <div>
      <h2>Recently Searched:</h2>
      <ul>
        {recentSearches.map((search, index) => (
          <li key={index} onClick={() => handleSearchClick(search)}>
            {search}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentSearches;
