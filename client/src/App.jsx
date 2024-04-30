import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import About from "./components/About";
import Navbar from "./components/Navbar";
import SkincareQuiz from "./components/SkincareQuiz";
import Profile from "./components/Profile";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import { useState } from "react";
import AddContext from "./Context/AddContext";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = async (credentials) => {
    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      if (response.ok) {
        const { token } = await response.json(); // Assuming the token is returned in the response
        localStorage.setItem("token", token);
        setIsLoggedIn(true);
      } else {
        console.error("Login Failed");
      }
    } catch (error) {
      console.error("Error logging in:", error.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  const AddObject = {
    isLoggedIn,
    login,
    logout,
  };
  


  return (
    <AddContext.Provider value={AddObject}>
      <div className="App">
        <h1 className={location.pathname === "/" ? "home-heading" : ""}>
          Skinfinity
        </h1>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/try-it" element={<SkincareQuiz />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </AddContext.Provider>
  );
}

export default App;
