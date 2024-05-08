// Import necessary React libraries and components
import React, { useState, useEffect } from 'react';
import FavoritesGameCard from '@/components/FavoritesGameCard.jsx';
import HomeGameReviewCard from '@/components/HomeGameReviewCard.jsx';
import { Link } from 'react-router-dom';
import './Profile.css';

// Define the Profile functional component with 'user' as a prop
function Profile({ user }) {
  // useState hook to manage the favorites state, initialized as an empty array
  const [favorites, setFavorites] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [deleteGame, setDeleteGame] = useState(false);

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
      fetch(`http://localhost:8080/reviews/${user.id}`)
        .then((res) => {
        // Check if the response is successful
        if (res.ok) {
          return res.json(); // Parse JSON data from response
        } else {
          // Log error if the response is not successful
          return console.error("Something went wrong with your GET request");
        }
      })
      .then((reviewsData) => {
        setReviews(reviewsData);
      });
    }
  
  }, [user, deleteGame]);


  const handleUnfavorite = (gameId) => {
    setFavorites(favorites.filter((game) => game.id !== gameId));
    setDeleteGame(prev => !prev)
  }; // Dependency array with 'user', effect runs when 'user' changes

  // Render the Profile component
  return (
    <div>
      {/* <h1>Your Profile</h1> */}

      <h2>Your Favorites</h2>
        {/* Map through the first three favorites and render a FavoritesGameCard for each */}
        {favorites && favorites.length > 0 ? (
        <div className="favorites-container">
          {favorites.slice(0, 3).map((game) => (
            <FavoritesGameCard key={game.id} game={game} user={user} handleUnfavorite={handleUnfavorite} />
          ))}
          </div>
        ) : (
          <p>No favorites currently.</p>
        )}
      


      <h2>My Reviews</h2>
      <div className="my-reviews-container">
      {reviews && reviews.length > 0 ? (
    // Iterate through reviews and render a GameReviewCard for each
      reviews.slice(0, 3).map((gameStats) => (
      <HomeGameReviewCard key={gameStats.game_stats_id} gameStats={gameStats} />
    ))
  ) : (
    <p>No reviews yet.</p>
  )}
</div>
    </div>
  );
}

// Export the Profile component for use in other parts of the application
export default Profile;