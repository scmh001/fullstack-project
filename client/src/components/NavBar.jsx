import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import "./NavBar.css";

function NavBar() {
  return (
    <nav className="nav-bar">
      <Link to="/" className="title">Rendezvouz</Link>
      <ul>
        <li><NavLink to="/favorites">Favorites</NavLink></li>
        <li><NavLink to="/groups">Groups</NavLink></li>
        <li><NavLink to="/profile">Profile</NavLink></li>
        <li><NavLink to="/locator">Locator</NavLink></li>
      </ul>
    </nav>
  );
}

export default NavBar;