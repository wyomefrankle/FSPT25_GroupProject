import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import About from "./components/About";
import Navbar from "./components/Navbar";
import SkincareQuiz from "./components/SkincareQuiz";
import NewUser from "./components/NewUser";
import Profile from "./components/Profile";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import { useState, useEffect } from 'react';
import AddContext from "./Context/AddContext";

function App() {
  const [data, setData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const login = async (credentials) => {
    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(credentials),
      });
      if (response.ok) {
        const { token } = await response.json(); // Assuming the token is returned in the response
        localStorage.setItem("token", token);
        setIsLoggedIn(true);
      } else {
        throw new Error("Incorrect email or password. Please try again.");
      }
    } catch (error) {
      throw new Error("Error logging in:", + error.message);
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
        setData(json);
        console.log(json);
      } else {
        throw new Error("Failed to fetch profile");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      setData(null);
    }
  };

  const getFavorites = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/favorites", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const json = await response.json();
        setFavorites(json);
      } else {
        throw new Error("Failed to fetch favorites");
      }
    } catch (error) {
      console.error("Error fetching favorites:", error);
      setFavorites([]);
    }
  };

  useEffect(() => {
    getProfile();
    getFavorites(); // Call getFavorites when the component mounts
  }, [favorites]);

  return (
    <AddContext.Provider value={AddObject}>
      <div className="App">
        <h1 className={location.pathname === "/" ? "home-heading" : ""}>
          {/* Skinfinity */}
        </h1>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/try-it" element={<SkincareQuiz data={data}/>} />
          <Route path="/new-user" element={<NewUser />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile data={data} favorites={favorites} setFavorites={setFavorites}/>
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </AddContext.Provider>
  );
}

export default App;
