import React from "react";
import { Link } from "react-router-dom";
import Picture1 from '../assets/img/Picture1.png';
import Picture2 from '../assets/img/Picture2.jpg';

const About = () => {
  return (
    <div style={{
      backgroundImage: `url(${Picture1})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      height: "100vh",
      width: "100vw",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    }}>
    <h2 style= {{ textShadow: "0 0 5px rgba(255, 255, 255, 0.8)" , color: "#d3783f" }}>SKINFINITY</h2>
    <div className="about-section">
      <h2 className="about-title">
      <Link to="/login">About Us!</Link>
        </h2>
      <p className="about-description">
        Skinfinity is a project designed and developed by Wyome Frankle, Joselin
        Pineda, and Meg Chary.
      </p>
    <div className= "pictures">
      <img src= {Picture2} alt="Picture 2" style ={{ borderRadius: "50%", width:"120px", height: "120px" }}/>
    </div>
    </div>
    </div>
   
  );
};

export default About;
