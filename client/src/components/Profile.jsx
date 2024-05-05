import { useState, useEffect } from "react";
import Favorites from "./Favorites";


export default function Profile() {
  const [data, setData] = useState(null);
  const [bioInput, setBioInput] = useState("");
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedInput = localStorage.getItem("userInput");
    if (savedInput) {
      setBioInput(savedInput);
    }
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setBioInput(value);
    localStorage.setItem("userInput", value);
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
  }, []);

  return (
    <div>
      <h1>Profile</h1>

      {/* {data && <div className="text-center p-4"></div>} */}

      {data && (
        <div>
          <p>Name: {data.firstname}</p>
          <p>My Skin Type: {data.skintype}</p>
        </div>
      )}

      <div className="user-bio">
        <div>
          <h3>🍊 User Bio 🍊</h3>
          <form>
            <p>
              Followers: 0 <br></br>Following: 0
            </p>
            <p>🌍 Location: </p>
          </form>
          <textarea
            value={bioInput}
            onChange={handleChange}
            placeholder="Tell us about yourself!"
            rows="5"
            cols="33"
          />
        </div>
      </div>
      <Favorites favorites={favorites} setFavorites={setFavorites}/>
    </div>
  );
}
