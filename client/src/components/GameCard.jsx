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
      <img src={game.image} alt={game.game_name} />
      <Link to={`/games/${game.id}`}>
        <h2>{game.game_name}</h2>
      </Link>
      <p>Genre: {game.genre}</p>
      <p>Rating: {game.rating ? game.rating : 'N/A'} ⭐</p> 
      {/* need to write logic to display stars for rating or rating out of 100? */}
      <p>Description: {expanded ? game.description : game.description.slice(0, 35) + '...'}
        <button onClick={toggleDescription}>{expanded ? 'Read less' : 'Read more'}</button>
      </p>
    </div>
  );
};

export default GameCard;