import React, { useState } from 'react';
import './WishListGameCard.css';
import { Link } from 'react-router-dom';

const WishListGameCard = ({ game, user, handleUnwishlist }) => {

  const handleDelete = () => {
    fetch(`http://localhost:8080/game-statistics/${game.id}/${user.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ wish_listed: false }),
    })
      .then((res) => res.json())
      .then((data) => {
        handleUnwishlist(data.id);
      })
      .catch((error) => {
        console.error('Error deleting game from wishlist:', error);
      });
  };

  return (
    <div className="wishlist-game-card">
      {/* Delete button */}
      <button className="delete-button" onClick={handleDelete}>❌</button>
      <div className="left-column">
        <img className="wishlist-game-image" src={game.image} alt={game.game_name} />
      </div>

      <div className="center-column">
        <div className="game-details">
          <Link to={`/games/${game.id}`}>
            <h2>{game.game_name}</h2>
          </Link>
          <p>Reviews: {game.reviews ? game.reviews : 'N/A'}</p>
          <p>Description: {game.description ? game.description :'N/A'}</p>
        </div>
      </div>

      <div className="right-column">
        <div className="game-details">
          <p>Rating: {game.rating ? game.rating : 'N/A'} ⭐</p>
          <p>Genre: {game.genre ? game.genre : 'N/A'}</p>
          <p>Developer: {game.developer ? game.developer : 'N/A'}</p>
          <p>Release Date: {game.releaseDate ? game.releaseDate : 'N/A'}</p>
          <p>Maturity Level: {game.maturityLevel ? game.maturityLevel : 'N/A'}</p>
          <p>Platforms: {game.platform ? game.platform : 'N/A'}</p>
        </div>
      </div>
    </div>
  );
};


export default WishListGameCard;