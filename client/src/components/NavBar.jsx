import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import './NavBar.css';

const NavBar = ({user, updateUser}) => {
  const [isHovered, setIsHovered] = useState(false);

  const toggleHover = () => setIsHovered(!isHovered);
  
  const navigate = useNavigate()

  const handleLogout = () => {
		fetch('http://localhost:8080/logout')
		.then(res => res.json())
		.then(data => updateUser(null))
    navigate('http://localhost:8080/signin')
	}

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
          {user ? (
            <>
              {['/', '/games', '/favorites', '/wishlist', '/profile'].map((path, index) => (
                <li key={index}>
                  <NavLink to={path} activeClassName="active-link">
                    <span className="link-text">{path.substring(1) || 'home'}</span>
                    <span className="link-bg"></span>
                  </NavLink>
                </li>
              ))}
              <li>
                <button
                  className="link-text"
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                  }}
                  onClick={handleLogout}
                >
                  logout
                  <span className="link-bg"></span>
                </button>
              </li>
            </>
          ) : (
            <>
              {['/', '/games'].map((path, index) => (
                <li key={index}>
                  <NavLink to={path} activeClassName="active-link">
                    <span className="link-text">{path.substring(1) || 'home'}</span>
                    <span className="link-bg"></span>
                  </NavLink>
                </li>
              ))}
              <li>
                <NavLink to="/signin" activeClassName="active-link">
                  <span className="link-text">sign in</span>
                  <span className="link-bg"></span>
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;