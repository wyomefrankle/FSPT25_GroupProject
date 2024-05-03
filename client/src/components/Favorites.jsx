import { useState, useEffect } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faTrash } from '@fortawesome/free-solid-svg-icons';

function Favorites() {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
    getFavorites();
    }, []);

    const getFavorites = () => {
    fetch(`http://localhost:4000/api/favorites`)
        .then(response => response.json())
        .then(favorites => {
        setFavorites(favorites);
        })
        .catch(error => {
          console.log(error);
      })
    };

    const deleteFavorite = () => {
        fetch(`http://localhost:4000/api/favorites`, {
          method: "DELETE"
        })
          .then(result => {
            if (!result.ok) {
              throw new Error("Failed to delete favorite");
            }
            return result.json();
          })
          .then(json => {
            setFavorites(json);
          })
          .catch(error => {
            console.log(error);
          });
      };


  return (
    <div>
        
        <div className="recipe-catalog-container">
        <h1> Favorites </h1>
          <div className="recipe-catalog">
            {favorites.map(favorite => (
              <div key={favorite.name} className="recipe-card">

                        <br></br>
                    <div className="image-label-container">
                        <div>
                        <a
                          href={favorite.productURL} 
                          target="_blank" 
                          rel="noopener noreferrer">
                          <img className="recipe-image" src={favorite.productURL} alt={favorite.productURL} />
                          </a>
                        </div>
                        <p className="recipe-headline">{favorite.name} by {favorite.brand}</p> 
                        <div className="ingredient-amount-label-secondary">
                          {/* <a
                          href={favorite.url} 
                          target="_blank" 
                          rel="noopener noreferrer">
                          <p className='view-recipe'>View Recipe</p>
                        </a> */}
                          <FontAwesomeIcon icon={faTrash} onClick={() => deleteFavorite(favorite.id)} />
                      </div>
              </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}


export default Favorites;
