import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const Navbar = () => {
  const handleLogout = () => {
    // Perform logout logic here
    // For example, clear user data from local storage and redirect to the login page
    localStorage.removeItem("capstone_user");
    window.location.href = "/login"; // Redirect to the login page
  };

  return (
    <nav className="navbar">
      <ul className="nav-menu">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/games" className="nav-link">
            Games
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/walkthroughs" className="nav-link">
            Walkthroughs
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/music" className="nav-link">
            Music
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/forums" className="nav-link">
            Forums
          </Link>
        </li>
        <li className="nav-item">
          <button className="nav-link" onClick={handleLogout}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
