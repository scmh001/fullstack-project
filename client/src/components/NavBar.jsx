import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  const [isHovered, setIsHovered] = useState(false);

  const toggleHover = () => setIsHovered(!isHovered);

  return (
    <div className="nav-container">
      <nav className="nav-bar">
        <Link
          to="/"
          className="title"
          onMouseEnter={() => toggleHover()}
          onMouseLeave={() => toggleHover()}
        >
          <span className={`title-text ${isHovered ? 'title-animate' : ''}`}>
            Gamespace
          </span>
        </Link>
        <ul className="nav-links">
          {['/', '/games', '/favorites', '/wishlist', '/profile', '/signin'].map((path, index) => (
            <li key={index}>
              <NavLink 
                to={path} 
                className={({ isActive }) => isActive ? 'active-link' : ''}
              >
                <span className="link-text">{path.substring(1) || 'Home'}</span>
                <span className="link-bg"></span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;