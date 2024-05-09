import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom"; 
import SaveFavoriteModal from "./SaveFavoriteModal";
import Picture1 from '../assets/img/Picture1.png';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import ClipLoader from 'react-spinners/ClipLoader';
import '../SkincareQuiz.css';

const SkincareQuiz = () => {
  
  const [budget, setBudget] = useState("");
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState("");
  const [skinconcern, setSkinconcern] = useState("Dryness");
  const [skincareRecommendations, setSkincareRecommendations] = useState([]);
  const serumImages = ["https://5.imimg.com/data5/RN/QW/LK/SELLER-3074232/face-serum.jpg", "https://plus.unsplash.com/premium_photo-1669735916387-24340468a65c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHNlcnVtJTIwYm90dGxlfGVufDB8fDB8fHww", "https://images.unsplash.com/photo-1608571424266-edeb9bbefdec?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTc1fHxza2luY2FyZXxlbnwwfHwwfHx8MA%3D%3D"]
  const moisturizerImages = ["https://t4.ftcdn.net/jpg/06/49/44/83/360_F_649448391_pnUFms5Im2sZ5rKh168XQjiP0wabz56O.jpg", "https://plus.unsplash.com/premium_photo-1681364365252-387c05c06c40?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fHNraW5jYXJlJTIwbW9ja3VwfGVufDB8fDB8fHww", "https://img.freepik.com/premium-photo/blank-cosmetic-cream-tube-mockup_590726-162.jpg"]
  const tonerImages = ["https://beautymag.com/wp-content/uploads/2020/10/Best-Toners-for-Oily-Skin-scaled.jpg", "https://unblast.com/wp-content/uploads/2021/01/Skin-Care-Bottle-Mockup.jpg", "https://images.unsplash.com/photo-1609097164721-d8b247a6bd6b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHNraW5jYXJlJTIwYm90dGxlfGVufDB8fDB8fHww"]
  const cleanserImages = ["https://images.unsplash.com/photo-1623143445418-40c192fa3d11?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2tpbmNhcmUlMjBtb2NrdXB8ZW58MHx8MHx8fDA%3D", "https://images.unsplash.com/photo-1597931752949-98c74b5b159f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fHNraW5jYXJlJTIwbW9ja3VwfGVufDB8fDB8fHww", "https://images.unsplash.com/photo-1556229010-aa3f7ff66b24?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHNraW5jYXJlJTIwbW9ja3VwfGVufDB8fDB8fHww"]
  const [skintype, setSkintype] = useState(null);
  const [showForm, setShowForm] = useState(true); // State to toggle between form and recommendations
  
  const getProfile = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("/api/profile", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const json = await response.json();
        setSkintype(json.skintype);
        console.log(json.skintype);
      } else {
        throw new Error("Failed to fetch profile");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const getSkincareQuiz = async ( skintype, budget, country, skinconcern ) => {

    try {
      const url = `http://localhost:4000/users?skintype=${skintype}&budget=${budget}&country=${country}&skinconcern=${skinconcern}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        throw new Error(`Failed to fetch skincare quiz: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log("Data from server:", data);
      setSkincareRecommendations(JSON.parse(data.text));
      console.log(JSON.parse(data.text))
      console.log("Product type is: ", JSON.parse(data.text)[0].product_type)
      setLoading(false);
      setShowForm(false);
    } catch (error) {
      console.error('Error fetching skincare quiz results:', error);
      setLoading(false);
      return []; // Return an empty array in case of an error
    }
  };

  const handleBudget = event => {
    setBudget(event.target.value);
  };

  const handleCountry = (event) => {
    setCountry(event.target.value)
  };

  const handleSkinconcern = (event) => {
    setSkinconcern(event.target.value)
  };

  const handleSubmit = event => {
    event.preventDefault();
    setLoading(true);
    getSkincareQuiz(skintype, budget, country, skinconcern);
  };

  function getProductImage(productType, index) {
    switch (productType) {
      case "Serum":
        return serumImages[index % serumImages.length];
      case "Moisturizer":
        return moisturizerImages[index % moisturizerImages.length];
      case "Toner":
        return tonerImages[index % tonerImages.length];
      case "Cleanser":
        return cleanserImages[index % cleanserImages.length];
      default:
        return "https://via.placeholder.com/150"; // Default image
    }
  }

  const saveFavorite = async (product) => { 
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:4000/api/favorites`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(product)
      });
  
      if (!response.ok) {
        throw new Error(`Failed to save favorite product: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log('Response from server:', data);
      // setMyFavorites(data)
    } catch (error) {
      console.error('Error saving favorite product:', error);
    }
  };


  const handleSaveFavorite = (product) => {
    saveFavorite(product);
    console.log(product);
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className='background-image-container'>
      <div className="container">
        {!loading && showForm && ( // Conditionally render the form
          <div>
            <br/>
            <br/>
            <br/>
            <div className="centered-content">
              <h3 className="custom-title">Enter the Skinfinity Realm!</h3>
              <div className="container" style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "50vw"
              }}>
                <form onSubmit={e => handleSubmit(e)}>
                  <div className="form-group">
                    <label className="form-label">Budget: </label>
                    <input type="text" className="form-control" onChange={e => handleBudget(e)} value={budget} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Country:</label>
                    <CountryDropdown
                      value={country}
                      onChange={(val) => setCountry(val)}
                      className="form-control" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Skin Concern:</label>
                    <select className="form-control" style={{ textAlign: "center" }} value={skinconcern} onChange={handleSkinconcern}>
                      <option value="Dryness">Dryness</option>
                      <option value="Acne">Acne</option>
                      <option value="Large pores">Large pores</option>
                      <option value="Aging">Aging</option>
                      <option value="Hyperpigmentation">Hyperpigmentation</option>
                      <option value="Redness">Redness</option>
                    </select>
                  </div>
                  <br />
                  <button type="submit" className="btn btn-light">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
        {!loading && !showForm && ( // Conditionally render the recommendations
          <div>
            {skincareRecommendations.length > 0 && 
              Object.entries(
                skincareRecommendations.reduce((acc, recommendation) => {
                  acc[recommendation.product_type] = acc[recommendation.product_type] || [];
                  acc[recommendation.product_type].push(recommendation);
                  return acc;
                }, {})
              ).map(([productType, recommendations], index) => (
                <div key={index}>
                  <br/>
                  <br/>
                  <h1 className="card-title">{productType}</h1>
                  <div className="row">
                    {recommendations.map((recommendation, recIndex) => (
                      <div className="col-md-4 col-sm-6 mb-4" key={recommendation.id}>
                        <div className="card h-100">
                          <img 
                            src={getProductImage(productType, recIndex)} 
                            alt={recommendation.name} 
                            className="card-img-top" 
                            style={{ height: '250px', objectFit: 'cover' }} 
                          />
                          <div className="card-body">
                            <h5 className="card-title">{recommendation.name}</h5>
                            <a 
                              href={recommendation.productURL} 
                              className="btn btn-primary" 
                              target="_blank" 
                              rel="noopener noreferrer"
                            >
                              {recommendation.brand}
                            </a>
                            <p className="card-text">{recommendation.price}</p>
                            <SaveFavoriteModal
                              launchBtnText="Save Favorite"
                              modalTitle="Product saved to favorites! 🛒"
                              recommendation={recommendation}
                              handleSaveFavorite={handleSaveFavorite}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            }
            <button className="btn btn-light" onClick={() => setShowForm(true)}>
              Refresh Recommendations
            </button>
          </div>
        )}
        {loading && (
          <div className="centered-content">
            <h3 className="custom-title">Enter the Skinfinity Realm!</h3>
            <p>Loading...</p>
            <div className="loader-container">
              <ClipLoader color={'#fff'} size={150} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SkincareQuiz;
