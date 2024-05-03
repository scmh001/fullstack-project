<<<<<<< HEAD
import React, { useState } from 'react';
=======
import React from 'react';
>>>>>>> shukri
import { NavLink, Link } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
<<<<<<< HEAD
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleHoverExit = () => {
    setIsHovered(false);
  };

  return (
    <div className="nav-container">
      <div className="nav-bar">
        <nav>
          <Link
            to="/"
            className="title"
            onMouseEnter={handleHover}
            onMouseLeave={handleHoverExit}
          >
            <span className={`title-text ${isHovered ? 'title-animate' : ''}`}>
              Gamespace
            </span>
          </Link>
          <ul>
          <li>
              <NavLink to="/" activeClassName="active-link">
                <span className="link-text">Home</span>
                <span className="link-bg"></span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/games" activeClassName="active-link">
                <span className="link-text">Games</span>
                <span className="link-bg"></span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/favorites" activeClassName="active-link">
                <span className="link-text">Favorites</span>
                <span className="link-bg"></span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/wishlist" activeClassName="active-link">
                <span className="link-text">Wishlist</span>
                <span className="link-bg"></span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/groups" activeClassName="active-link">
                <span className="link-text">Groups</span>
                <span className="link-bg"></span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/profile" activeClassName="active-link">
                <span className="link-text">Profile</span>
                <span className="link-bg"></span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/signin" activeClassName="active-link">
                <span className="link-text">Sign In</span>
                <span className="link-bg"></span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
=======
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
>>>>>>> shukri
  );
}

export default NavBar;