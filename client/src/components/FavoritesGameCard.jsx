import React, { useState } from 'react';
import './FavoritesGameCard.css';
import { Link } from 'react-router-dom';

const FavoritesGameCard = ({ game }) => {

    const topThreeComments = game.comments ? game.comments.slice(0, 3) : [];

    const handleDelete = () => {
        onDelete(game.id);
      };

    return (
    <div className="favorites-game-card">
        {/* Delete button */}
      <button className="delete-button" onClick={handleDelete}>❌</button>
      <img src={game.image} alt={game.name} />
      <Link to={`/games/${game.id}`}>
        <h2>{game.name}</h2>
      </Link>
      <p>Rating: {game.rating ? game.rating : 'N/A'} ⭐</p>
      <p>Genre: {game.genre}</p>
      {/* Display top 3 comments */}
      {topThreeComments.map((comment, index) => (
        <p key={index}>Comments {index + 1}: {comment}</p>
      ))}
      {/* If less than 3 comments, display remaining slots */}
      {game.comments && game.comments.length < 3 &&
        Array.from({ length: 3 - game.comments.length }).map((_, index) => (
          <p key={index + game.comments.length}>Comment {index + game.comments.length + 1}: N/A</p>
        ))
      }
    </div>
  );
};


export default FavoritesGameCard;