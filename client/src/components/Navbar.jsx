import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AddContext from "../Context/AddContext";

const Navbar = () => {
  const { isLoggedIn, logout } = useContext(AddContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  }

  return (
    <nav>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
            <Link to="/about">About Us</Link>
            <Link to="/try-it">Try it!</Link>
            {/* <Link to="/new-user">Create Account</Link> */}
            {/* <Link to="/login">Login</Link> */}
            {!isLoggedIn && <Link to="/login">Login</Link>}
            {isLoggedIn && <Link to="/profile">Profile</Link>}
            {isLoggedIn && (
              <button onClick={handleLogout} className="nav-link">
                Logout
              </button>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
