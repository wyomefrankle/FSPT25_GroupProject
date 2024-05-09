import { useState, useEffect } from "react";
import Picture1 from '../assets/img/Picture1.png';
import Favorites from "./Favorites";


export default function Profile() {
  const [bioInput, setBioInput] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [data, setData] = useState(null);

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
        // console.log(json);
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
    <div className="container" style={{
      backgroundImage: `url(${Picture1})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      height: "100vh",
      width: "100vw",
      // display: "flex",
      // flexDirection: "column",
      // justifyContent: "center",
      // alignItems: "center",
    }}>
      {/* <h1>Profile</h1> */}
      {data && (
        <div className="text-center p-4">
          <br/>
          <div className='row'>
            <p>Name: {data.firstname}</p>
            <p>My Skin Type: {data.skintype}</p>
          </div>

          <div className="user-bio">
            <div>
              <h3>🍊 User Bio 🍊</h3>
              <form>
                <p>
                  Followers: 0 <br />Following: 0
                </p>
                <p>🌍 Location: </p>
              </form>
              <textarea
                value={bioInput}
                onChange={handleChange}
                placeholder="Tell us about yourself!"
                rows="2"
                cols="33"
                style={{ borderRadius: "10px"}}
              />
            </div>
          </div>
          <Favorites favorites={favorites} setFavorites={setFavorites} />
        </div>
      )}
    </div>
  );
}
