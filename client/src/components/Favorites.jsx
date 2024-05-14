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
      {/* <h1 className="mb-4">Favorites</h1> */}
      <div className="row row-cols-1 row-cols-md-3 g-4 custom-background-row">
        {favorites.map(favorite => (
          <div key={favorite.id} className="col">
            <div className="card h-100 d-flex flex-column justify-content-between">
              <div className="card-body">
                <h5 className="card-title">{favorite.name}</h5>
                <p className="card-text">Brand: {favorite.brand}</p>
                <p className="card-text">Product Type: {favorite.product_type}</p>
                <p className="card-text">Price: ${favorite.price}</p>
              </div>
              <div className="card-footer text-center">
                <button onClick={() => deleteFavorite(favorite.id)} type="button" className="btn btn-danger">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorites;
