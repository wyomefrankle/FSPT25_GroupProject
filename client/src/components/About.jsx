import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div>
    <h2 style= {{ textShadow: "0 0 10px rgba(0, 0, 0, 1)" }}>SKINFINITY</h2>
    <div className="about-section">
      <h2 className="about-title">
      <Link to="/login">About Us!</Link>
        </h2>
      <p className="about-description">
        Skinfinity is a project designed and developed by Wyome Frankle, Joselin
        Pineda, and Meg Chary.
      </p>
    </div>
    </div>
  );
};

export default About;
