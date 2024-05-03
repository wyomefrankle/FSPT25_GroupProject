import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom"; 

// import './App.css';

const SkincareQuiz = () => {
  
  const [budget, setBudget] = useState("");
  const [loading, setLoading] = useState(false);
    const [country, setCountry] = useState("");
    const [skinconcern, setSkinconcern] = useState("");
    const [skincareRecommendations, setSkincareRecommendations] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const serumImages = ["https://5.imimg.com/data5/RN/QW/LK/SELLER-3074232/face-serum.jpg", "https://plus.unsplash.com/premium_photo-1669735916387-24340468a65c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHNlcnVtJTIwYm90dGxlfGVufDB8fDB8fHww", "https://images.unsplash.com/photo-1608571424266-edeb9bbefdec?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTc1fHxza2luY2FyZXxlbnwwfHwwfHx8MA%3D%3D"]
    const moisturizerImages = ["https://t4.ftcdn.net/jpg/06/49/44/83/360_F_649448391_pnUFms5Im2sZ5rKh168XQjiP0wabz56O.jpg", "https://plus.unsplash.com/premium_photo-1669735916387-24340468a65c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHNlcnVtJTIwYm90dGxlfGVufDB8fDB8fHww", "https://img.freepik.com/premium-photo/blank-cosmetic-cream-tube-mockup_590726-162.jpg"]
    const tonerImages = ["https://5.imimg.com/data5/RN/QW/LK/SELLER-3074232/face-serum.jpg", "https://plus.unsplash.com/premium_photo-1669735916387-24340468a65c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHNlcnVtJTIwYm90dGxlfGVufDB8fDB8fHww", "https://images.unsplash.com/photo-1608571424266-edeb9bbefdec?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTc1fHxza2luY2FyZXxlbnwwfHwwfHx8MA%3D%3D"]
    const cleanserImages = ["https://images.unsplash.com/photo-1623143445418-40c192fa3d11?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2tpbmNhcmUlMjBtb2NrdXB8ZW58MHx8MHx8fDA%3D", "https://images.unsplash.com/photo-1608571424266-edeb9bbefdec?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTc1fHxza2luY2FyZXxlbnwwfHwwfHx8MA%3D%3D"]

    // const [skintype, setSkintype] = useState("");

//   const { username } = useParams(); // Extracting username from URL parameters

  const skintype = [ //list of all possible skin concerns
  'Dry'
];

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
      
    } catch (error) {
      console.error('Error fetching skincare quiz results:', error);
      setLoading(false);
      return []; // Return an empty array in case of an error
    }
  };

  // Call getSkincareQuiz when component mounts
  // useEffect(() => {
  //   getSkincareQuiz(skintype, budget, country, skinconcern);
  // }, []);

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
  
  return (
    <div>
      <div className="container">
        {!loading && (
          <div>
            {skincareRecommendations.length > 0 && (
              Object.entries(
                skincareRecommendations.reduce((acc, recommendation) => {
                  acc[recommendation.product_type] = acc[recommendation.product_type] || [];
                  acc[recommendation.product_type].push(recommendation);
                  return acc;
                }, {})
              ).map(([productType, recommendations], index) => (
                <div key={index}>
                  <h3 className="card-title">{productType}</h3>
                  <div className="row">
                    {recommendations.map((recommendation, recIndex) => (
                      <div className="col-md-4 col-sm-6" key={recommendation.id}>
                        <div className="card">
                          <img 
                            src={getProductImage(productType, recIndex)} 
                            alt={recommendation.name} 
                            className="img-fluid" 
                          />
                          <strong className="card-text">Product:</strong> {recommendation.name}, {recommendation.brand}
                          <br />
                          <strong className="card-text">Price:</strong> {recommendation.price}
                          <a 
                            href={recommendation.productURL} 
                            target="_blank" 
                            rel="noopener noreferrer">
                            <strong className='card-text'>Product URL</strong>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
        {loading && <p>Loading...</p>}
      </div>
    <form onSubmit={e => handleSubmit(e)} className="form">
      <label className="label">
        Budget:
        <input
          onChange={e => handleBudget(e)}
          value={budget}
          className="input"
        />
      </label>
      <div className="form-group">
        <label className="form-label">Country:</label>
        <select className="form-control" value={country} onChange={handleCountry} style={{ width: '40%' }}>
          <option value="the US">United States</option>
          <option value="the UK">United Kingdom</option>
          <option value="Spain">Spain</option>
          <option value="Norway">Norway</option>
          <option value="Canada">Canada</option>
          <option value="South Africa">South Africa</option>
          <option value="the Netherlands">Netherlands</option>
        </select>
      </div>
      <div className="form-group">
        <label className="form-label">Skin Concern:</label>
        <select className="form-control" value={skinconcern} onChange={handleSkinconcern} style={{ width: '40%' }}>
          <option value="Dryness">Dryness</option>
          <option value="Acne">Acne</option>
          <option value="Large pores">Large pores</option>
          <option value="Aging">Aging</option>
          <option value="Hyperpigmentation">Hyperpigmentation</option>
          <option value="Redness">Redness</option>

        </select>
      </div>
      <button type="submit" className="submit-button">
        Submit
      </button>
    </form>
  </div>
  );
};

export default SkincareQuiz;

