import React, { useState, useEffect } from 'react';
import FavoritesGameCard from '@/components/FavoritesGameCard.jsx';
import { Link } from 'react-router-dom';
import './Profile.css';

function Profile({ user }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Fetch favorites
    if (user && user.id) {
      fetch(`http://localhost:8080/favorites/${user.id}`)
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            return console.error("Something went wrong with your GET request");
          }
        })
        .then((favoritesData) => {
          setFavorites(favoritesData);
        });
    }
  }, [user]);

  return (
    <div>
      <h1>Your Profile</h1>

      <h2>Your Favorites</h2>
      <div className="favorites-container">
        {favorites.slice(0, 3).map((game) => (
          <FavoritesGameCard key={game.id} game={game} user={user} />
        ))}
      </div>

      <h2>Recently Reviewed</h2>
      <div className="recently-reviewed-container">
      </div>

      <h2>My Reviews</h2>
      <div className="my-reviews-container">
      </div>
    </div>
  );
}

export default Profile;