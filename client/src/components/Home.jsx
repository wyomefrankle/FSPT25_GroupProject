
import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import imageSrc from "../../../images/image1.png"; // Import the image

const Home = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  // State to track hover state
  const [isHovered, setIsHovered] = useState(false);



return (
  <div
    className="page"
    style={{
      position: "relative", 
      overflow: "hidden", 
      width: "100vw",
      height:"100vh",
      display: "flex",
      margin: "0",
      justifyContent: "center",
      alignItems: "center" 
    }}
  >
    {isHome && (
      <div
        style={{
          width: "100%", 
          height: "100%", 
          position: "relative", 
          transition: "width 0.3s, height 0.3s", // Add transition for smoother resizing
        }}
        onMouseEnter={() => setIsHovered(true)} // Set hover state to true on mouse enter
        onMouseLeave={() => setIsHovered(false)} // Set hover state to false on mouse leave
      >
        <img
          src={imageSrc}
          alt="Skinfinity"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            margin: "0",
            padding: "0",
          }}
        />
        {/* Overlay with "Log in" button */}
        {isHovered && (
          <Link to="/About">
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column", // Stack items vertically
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(0, 0, 0, 0.6)", // Semi-transparent black background
                color: "white",
                fontSize: "24px",
                fontWeight: "bold",
                cursor: "pointer",
                textShadow: "0 0 10px rgba(255, 255, 255, 0.8)",
              }}
            >
              <div style={{ marginBottom: "10px" }}>
                <Link to="/About" style={{ color: "inherit", textDecoration: "none" }}>SKINFINITY</Link>
              </div>
              <div>
                <Link to="/login" style={{ color: "inherit", textDecoration: "none" }}>Log In</Link>
              </div>
            </div>
          </Link>
        )}
      </div>
    )}
  </div>
);
};

export default Home;