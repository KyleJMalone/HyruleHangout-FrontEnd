import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const Navbar = () => {
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
      </ul>
    </nav>
  );
};

export default Navbar;
