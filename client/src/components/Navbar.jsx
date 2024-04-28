import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
            <Link to="/about">About Us</Link>
            <Link to="/try-it">Try it!</Link>
            <Link to="/new-user">Create Account</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
