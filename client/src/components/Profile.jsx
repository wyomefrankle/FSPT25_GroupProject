import { useState, useEffect } from "react";
import Picture1 from '../assets/img/Picture1.png';
import Favorites from "./Favorites";


export default function Profile() {
  const [bioInput, setBioInput] = useState("");
  const [favorites, setFavorites] = useState([]);
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
    <div className="container-fluid" style={{
      backgroundImage: `url(${Picture1})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      height: "100vh",
      width: "100vw"
    }}>
      {data && (
        <div className="row justify-content-center">
          <div className="col-md-6">
            <br/>
            <br/>
            <div className="card bg-light">
              <div className="card-body text-center">
                <h2 className="card-title">Profile</h2>
                <div className="row">
                  <div className="col">
                    <p><strong>Name:</strong> {data.firstname}</p>
                    <p><strong>My Skin Type:</strong> {data.skintype}</p>
                  </div>
                </div>
                <div className="user-bio">
                  <h3 className="mt-4">🍊 User Bio 🍊</h3>
                  <form>
                    <p>
                      <strong>Followers:</strong> 0 <br /><strong>Following:</strong> 0
                    </p>
                    <p><strong>Location:</strong></p>
                  </form>
                  <textarea
                    value={bioInput}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Tell us about yourself!"
                    rows="5"
                  />
                </div>
              </div>
            </div>
            <br/>
            <div className="card bg-light">
              <div className="card-body text-center">
                <h2 className="card-title">Favorites</h2>
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
                <Favorites favorites={filteredFavorites} setFavorites={setFavorites} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}