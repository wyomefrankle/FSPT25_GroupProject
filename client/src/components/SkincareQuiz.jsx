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
    setSkincareRecommendations(data.text);
      setLoading(false);
      
    } catch (error) {
      console.error('Error fetching quick recipes:', error);
      setLoading(false);
      return []; // Return an empty array in case of an error
    }
  };

  // Call getSkincareQuiz when component mounts
  useEffect(() => {
    getSkincareQuiz(skintype, budget, country, skinconcern);
  }, []);

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
  
  return (
    <div>
    <div className="container">
      {!loading && skincareRecommendations}
      {loading && <p>Loading...</p>}
    </div>
    <form onSubmit={e => handleSubmit(e)} className="form">
      <label className="label">
        Budget
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
          <option value="the Netherlands">The Netherlands</option>
        </select>
      </div>
      <div className="form-group">
        <label className="form-label">Skin Concern:</label>
        <select className="form-control" value={skinconcern} onChange={handleSkinconcern} style={{ width: '40%' }}>
          <option value="dryness">dryness</option>
          <option value="acne">acne</option>
          <option value="large pores">large pores</option>
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
