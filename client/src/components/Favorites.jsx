// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faTrash } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

function Favorites({ favorites, setFavorites }) {
  const deleteFavorite = async (favoriteId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:4000/api/favorites/${favoriteId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        }
      });
      if (!response.ok) {
        throw new Error("Failed to delete favorite");
      }
      // Remove the deleted favorite from the favorites state
      // Note: This assumes that the parent component will handle updating the favorites state
       // Remove the deleted favorite from the favorites state
       const updatedFavorites = favorites.filter(favorite => favorite.id !== favoriteId);
       setFavorites(updatedFavorites); // Update the favorites state after deletion
 
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1> Favorites </h1>
      <div className="recipe-catalog">
        {favorites.map(favorite => (
          <div key={favorite.id} className="recipe-card">
            <br />
            <div className="image-label-container">
              <div>
              <p>
                <a href={favorite.productURL} target="_blank" rel="noopener noreferrer">
                  {favorite.name}
                </a>
                {" "}
                by {favorite.brand}
              </p>
              {/* <p>{favorite.product_type}</p> */}
              {/* <p>{favorite.price}</p> */}
              </div>
              <div className="ingredient-amount-label-secondary">
                <button onClick={() => deleteFavorite(favorite.id)} type="button" className="btn btn-light">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorites;
