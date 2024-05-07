// Import necessary React and React Router DOM components
import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import './NavBar.css'; // Importing CSS for styling

// NavBar component definition accepting props
const NavBar = ({user, updateUser}) => {
  // State to manage hover effect on the title
  const [isHovered, setIsHovered] = useState(false);

  // Function to toggle hover state
  const toggleHover = () => setIsHovered(!isHovered);
  
  // Hook to programmatically navigate between routes
  const navigate = useNavigate()

  // Function to handle user logout
  const handleLogout = () => {
    // Fetch call to logout endpoint
		fetch('http://localhost:8080/logout')
		.then(res => res.json())
		.then(data => updateUser(null)) // Update user state to null after logout
    navigate('/signin', { relative: 'path' }); // Navigate to signin page after logout
	}

  // JSX for rendering the navigation bar
  return (
    <div className="nav-container">
      <nav className="nav-bar">
        {/* Link component for the application title */}
        <Link
          to="/"
          className="title"
          onMouseEnter={() => toggleHover()} // Handle mouse enter for hover effect
          onMouseLeave={() => toggleHover()} // Handle mouse leave for hover effect
        >
          {/* Conditional rendering for hover effect on title */}
          <span className={`title-text ${isHovered ? 'title-animate' : ''}`}>
            Gamespace
          </span>
        </Link>
        {/* Navigation links */}
        <ul className="nav-links">
          {/* Conditional rendering based on user authentication */}
          {user ? (
            <>
              {/* Map through paths for authenticated users */}
              {['/', '/games', '/favorites', '/wishlist', '/profile'].map((path, index) => (
                <li key={index}>
                  {/* NavLink for styled navigation links */}
                  <NavLink to={path} activeClassName="active-link">
                    <span className="link-text">{path.substring(1) || 'home'}</span>
                    <span className="link-bg"></span>
                  </NavLink>
                </li>
              ))}
              {/* Logout button */}
              <li>
                <button
                  className="link-text"
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                  }}
                  onClick={handleLogout} // Handle logout on click
                >
                  logout
                  <span className="link-bg"></span>
                </button>
              </li>
            </>
          ) : (
            <>
              {/* Map through paths for unauthenticated users */}
              {['/', '/games'].map((path, index) => (
                <li key={index}>
                  <NavLink to={path} activeClassName="active-link">
                    <span className="link-text">{path.substring(1) || 'home'}</span>
                    <span className="link-bg"></span>
                  </NavLink>
                </li>
              ))}
              {/* Link to sign in page */}
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

// Export the NavBar component
export default NavBar;