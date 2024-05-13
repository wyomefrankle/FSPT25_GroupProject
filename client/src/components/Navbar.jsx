import React, { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AddContext from "../Context/AddContext";

const Navbar = () => {
  const { isLoggedIn, logout } = useContext(AddContext);
  const navigate = useNavigate();
  const location = useLocation();
 

  const handleLogout = () => {
    logout();
    navigate("/");
  }

  return (
    <nav>
      <div>
        <ul>
          <li>
            <Link to= "/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
            <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>About Us</Link>
            <Link to="/try-it">Try it!</Link>
            {/* <Link to="/new-user">Create Account</Link> */}
            {/* <Link to="/login">Login</Link> */}
            {!isLoggedIn && <Link to="/login" className={location.pathname === '/login' ? 'active' : ''}>Login</Link>}
            {isLoggedIn && <Link to="/profile" className={location.pathname === '/profile' ? 'active' : ''}>Profile</Link>}
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
