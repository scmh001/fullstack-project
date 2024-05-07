// Import necessary React libraries and components
import React, { useState, useEffect } from 'react';
import FavoritesGameCard from '@/components/FavoritesGameCard.jsx';
import { Link } from 'react-router-dom';
import './Profile.css';

// Define the Profile functional component with 'user' as a prop
function Profile({ user }) {
  // useState hook to manage the favorites state, initialized as an empty array
  const [favorites, setFavorites] = useState([]);

  // useEffect hook to perform side effects, in this case, fetching user's favorite games
  useEffect(() => {
    // Check if user object exists and has an id
    if (user && user.id) {
      // Fetch request to get the user's favorites from a local server
      fetch(`http://localhost:8080/favorites/${user.id}`)
        .then((res) => {
          // Check if the response is successful
          if (res.ok) {
            return res.json(); // Parse JSON data from response
          } else {
            // Log error if the response is not successful
            return console.error("Something went wrong with your GET request");
          }
        })
        .then((favoritesData) => {
          // Update the favorites state with the fetched data
          setFavorites(favoritesData);
        });
    }
  }, [user]); // Dependency array with 'user', effect runs when 'user' changes

  // Render the Profile component
  return (
    <div>
      <h1>Your Profile</h1>

      <h2>Your Favorites</h2>
      <div className="favorites-container">
        {/* Map through the first three favorites and render a FavoritesGameCard for each */}
        {favorites.slice(0, 3).map((game) => (
          <FavoritesGameCard key={game.id} game={game} user={user} />
        ))}
      </div>

      <h2>Recently Reviewed</h2>
      <div className="recently-reviewed-container">
        {/* Container for recently reviewed games (not implemented) */}
      </div>

      <h2>My Reviews</h2>
      <div className="my-reviews-container">
        {/* Container for user reviews (not implemented) */}
      </div>
    </div>
  );
}

// Export the Profile component for use in other parts of the application
export default Profile;