
import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import imageSrc from "../../../images/image.png"; // Import the image

const Home = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  // State to track hover state
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="page"
      style={{
        background: isHome ? "#000000" : "#000000",
        position: "relative", // Ensure overlay is positioned relative to the container
        overflow: "hidden", // Hide overflow to prevent overlay from extending beyond container
        display: "flex",
        justifyContent: "center",
        alignItems: "center" // Center image both horizontally and vertically
      }}
    >
      {isHome && (
        <div
          style={{
            width: "70%", // Set initial width
            height: "70%", // Set initial height
            position: "relative", // Ensure overlay is positioned relative to the image
            transition: "width 0.3s, height 0.3s" // Add transition for smoother resizing
          }}
          onMouseEnter={() => setIsHovered(true)} // Set hover state to true on mouse enter
          onMouseLeave={() => setIsHovered(false)} // Set hover state to false on mouse leave
        >
          <img
            src={imageSrc}
            alt="Skinfinity"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover"
            }}
          />
          {/* Overlay with "Log in" button */}
          {isHovered && (
            <Link to="/login">
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "rgba(0, 0, 0, 0.6)", // Semi-transparent black background
                  color: "white",
                  fontSize: "24px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  textShadow: "0 0 10px rgba(255, 255, 255, 0.8)"
                  
                }}
              >
                Log in
              </div>
            </Link>
          )}
        </div>
      )}
      {/* Optional: Add other content */}
      {/* <p className="about-description">
        Welcome to Skinfinity! Our mission is to take the guesswork out of your skincare routine to truly unlock your skin's infinite potential.
      </p> */}
    </div>
  );
};

export default Home;
