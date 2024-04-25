// import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./components/Home";
import About from "./components/About";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <div className="App">
        <h1 className={location.pathname === "/" ? "home-heading" : ""}>
          Skinfinity
        </h1>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
