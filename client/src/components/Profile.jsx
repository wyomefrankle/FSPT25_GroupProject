import { useState, useEffect } from "react";
import Picture1 from "../assets/img/Picture1.png";
import Favorites from "./Favorites";
import "../SkincareQuiz.css";

export default function Profile() {
  const [bioInput, setBioInput] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [avatar, setAvatar] = useState([]);
  const [data, setData] = useState(null);
  const [filterCriteria, setFilterCriteria] = useState({
    price: "",
    brand: "",
    product_type: ""
  });

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
    console.log("Fetching user profile data, favorites, and avatar images");
    const token = localStorage.getItem("token");
    console.log("Authentication token:", token);
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
      console.log("Authentication token:", token);
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


  const onFileUpload = async () => {
    try {
      console.log("Uploading avatar...");
      const formData = new FormData();
      formData.append("avatarfile", selectedFile, selectedFile.name);
  
      const token = localStorage.getItem("token");
      console.log("Authentication token:", token);
      const res = await fetch("/api/avatar", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          
        },
        body: formData,
      });
  
      if (!res.ok) {
        throw new Error("Failed to upload avatar");
      }
  
      const data = await res.json();
      console.log(data);
      setAvatar(data.avatar);
      getAvatar(); // Fetch the updated list of avatars
        alert("Avatar uploaded successfully 🍋!");
    } catch (error) {
      console.error("Error uploading avatar:", error);
    }
  };

  const getAvatar = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("Authorization token:", token);
      const response = await fetch("/api/avatar", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch avatars");
      }
  
      const data = await response.json();
      console.log("Avatar data:", data);
      setAvatar(data);
    } catch (error) {
      console.error("Error fetching avatars:", error);
      // Display error message to the user
      alert("Failed to fetch avatars. Please try again.");
      setAvatar([]); // Set images to an empty array 
    }
  };
  
  const onFileChange = (event) => {
    console.log("File selected for upload:", event.target.files[0]);
    setSelectedFile(event.target.files[0])
    alert("Click to upload Avatar 👀!");
  };

  useEffect(() => {
    getProfile();
    getFavorites(); // Call getFavorites when the component mounts
    getAvatar();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterCriteria({ ...filterCriteria, [name]: value });
  };

  const filteredFavorites = favorites.filter(favorite => {
    const price = parseFloat(favorite.price); // Convert price to a number
    if (filterCriteria.price === "") {
      return (
        (filterCriteria.brand === "" || favorite.brand === filterCriteria.brand) &&
        (filterCriteria.product_type === "" || favorite.product_type === filterCriteria.product_type)
      );
    } else if (filterCriteria.price === "<5") {
      return price < 5 &&
        (filterCriteria.brand === "" || favorite.brand === filterCriteria.brand) &&
        (filterCriteria.product_type === "" || favorite.product_type === filterCriteria.product_type);
    } else if (filterCriteria.price === "5-15") {
      return (price >= 5 && price <= 15) &&
        (filterCriteria.brand === "" || favorite.brand === filterCriteria.brand) &&
        (filterCriteria.product_type === "" || favorite.product_type === filterCriteria.product_type);
    } else if (filterCriteria.price === "15-30") {
      return (price >= 15 && price <= 30) &&
        (filterCriteria.brand === "" || favorite.brand === filterCriteria.brand) &&
        (filterCriteria.product_type === "" || favorite.product_type === filterCriteria.product_type);
    } else if (filterCriteria.price === "30-50") {
      return (price >= 30 && price <= 50) &&
        (filterCriteria.brand === "" || favorite.brand === filterCriteria.brand) &&
        (filterCriteria.product_type === "" || favorite.product_type === filterCriteria.product_type);
    } else if (filterCriteria.price === ">50") {
      return price > 50 &&
        (filterCriteria.brand === "" || favorite.brand === filterCriteria.brand) &&
        (filterCriteria.product_type === "" || favorite.product_type === filterCriteria.product_type);
    }
  });

  return (
    <div className="background-image-container">
      <br />
      <br />
      <br />
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="card bg-light">
              <div className="card-body text-center">
                <h2>🍊 User Bio 🍊</h2>
                <div className="user-bio">
                  {selectedFile && (
                    <img
                      src={URL.createObjectURL(selectedFile)}
                      alt="Avatar"
                      className="avatar-image"
                    />
                  )}

                  {!selectedFile && avatar && avatar.map((image) => (
                    <img
                      key={image.id}
                      src={`/img/${image.avatar}`}
                      alt="Avatar"
                      className="avatar-image"
                    />
                  ))}
                </div>
                <div style={{ textAlign: "left" }}>
                  <form>
                    <p><strong>Name:</strong> {data && data.firstname}</p>
                    <p><strong>Skin Type:</strong> {data && data.skintype}</p>
                    <p><strong>Followers:</strong> 0</p>
                    <p><strong>Following:</strong> 0</p>
                    <textarea
                      value={bioInput}
                      onChange={handleChange}
                      placeholder="Tell us about yourself!"
                      rows="2"
                      cols="33"
                      style={{ borderRadius: "10px" }}
                    />
                    <h6 className="upload-title">Upload Picture!</h6>
                    <input type="file" onChange={onFileChange} style={{ display: 'none' }} id="fileInput" />
                    <label htmlFor="fileInput" className="custom-file-upload">
                      Choose File
                    </label>
                    <button onClick={onFileUpload} className="custom-upload-button">
                      Upload
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="card bg-light" style={{ width: "100%" }}>
              <div className="card-body text-center">
                <h2 className="card-title"> 🍋 Favorites 🍋</h2>
                <div className="form-group">
                  <label htmlFor="priceFilter">Price:</label>
                  <select
                    className="form-control"
                    id="priceFilter"
                    name="price"
                    value={filterCriteria.price}
                    onChange={handleFilterChange}
                  >
                    <option value="">All</option>
                    <option value="<5">Less than $5</option>
                    <option value="5-15">$5 - $15</option>
                    <option value="15-30">$15 - $30</option>
                    <option value="30-50">$30 - $50</option>
                    <option value=">50">Greater than $50</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="brandFilter">Brand:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="brandFilter"
                    name="brand"
                    value={filterCriteria.brand}
                    onChange={handleFilterChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="productTypeFilter">Product Type:</label>
                  <select
                    className="form-control"
                    id="productTypeFilter"
                    name="product_type"
                    value={filterCriteria.product_type}
                    onChange={handleFilterChange}
                  >
                    <option value="">All</option>
                    <option value="Cleanser">Cleanser</option>
                    <option value="Toner">Toner</option>
                    <option value="Serum">Serum</option>
                    <option value="Moisturizer">Moisturizer</option>
                  </select>
                </div>
                <br/>
                <Favorites favorites={filteredFavorites} setFavorites={setFavorites} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
