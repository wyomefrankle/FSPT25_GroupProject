import { useState, useEffect } from "react";
import Favorites from "./Favorites";


export default function Profile({data, favorites, setFavorites}) {
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
