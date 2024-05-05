import { useState, useEffect } from "react";
import Picture1 from '../assets/img/Picture1.png';
import Favorites from "./Favorites";

export default function Profile({ data, favorites, setFavorites }) {
  const [bioInput, setBioInput] = useState("");

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
      <h1>Profile</h1>
      {data && (
        <div className="text-center p-4">
          <div>
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
                rows="5"
                cols="33"
              />
            </div>
          </div>
          <Favorites favorites={favorites} setFavorites={setFavorites} />
        </div>
      )}
    </div>
  );
}
