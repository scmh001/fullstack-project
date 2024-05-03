import React, { useState } from 'react';
import './GameCard.css';
import { Link } from 'react-router-dom';

const GameCard = ({ game }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleDescription = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="game-card">
      <img className="game-image" src={game.image} alt={game.name} />
      <div className="game-details">
        <Link to={`/games/${game.id}`}>
          <h2>{game.name}</h2>
        </Link>
        <p>Genre: {game.genre}</p>
        <p>Rating: {game.rating ? game.rating : 'N/A'} ⭐</p> 
        <p>Developer: {game.developer ? game.developer: 'N/A'}</p>
        <p>Release Date: {game.releaseDate ? game.releaseDate : 'N/A'}</p>
        <p>Maturity Level: {game.maturityLevel ? game.maturityLevel : 'N/A'}</p>
        <p>Platforms: {game.platform ? game.platform : 'N/A'}</p>
        <p>Description: {expanded ? game.description : game.description.slice(0, 35) + '...'}
          <button onClick={toggleDescription}>{expanded ? 'Read less' : 'Read more'}</button>
        </p>
      </div>
    </div>
  );
};

export default WishListGameCard;