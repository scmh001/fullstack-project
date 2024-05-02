import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import gameData from '@/assets/TEST.json';

// THIS ENTIRE PAGE COULD ALSO BE A POP UP-PAGE ON GAMES ??

function GameDetail() {
  const { id } = useParams();
  const [game, setGame] = useState(null);

  useEffect(() => {
    // find the game with the corresponding ID
    const selectedGame = gameData.find(game => game.id === parseInt(id));
    setGame(selectedGame);
    // scrolls to the top when the component mounts
    window.scrollTo(0, 0);
  }, [id]);

  if (!game) {
    return <div>Loading...</div>; // displays loading indicator while fetching data
  }

  return (
    <div className="game-detail-container">
      {/* title w/ minor css*/}
      <h1 style={{ fontWeight: 'bold' }}>{game.name}</h1>
      {/* image to match location of figma// can be changed however */}
      <img src={game.image} alt={game.name} style={{ width: '50%', maxWidth: '300px' }} />
      {/* Rating in its own small rectangular container */}
      <div className="rating-container">
        <p style={{ marginBottom: '5px' }}>Rating</p>
        {/* CREATE COMPONENT FOR STARS or /100 FOR RATING */}
        <div className="stars-container">
          {/* Insert stars based on the game's rating */}
        </div>
      </div>
      {/* List of details// can edit and reformat however */}
      <div className="details-list">
        <p>Genre: {game.genre}</p>
        <p>System: {game.system}</p>
        <p>Developer: {game.developer}</p>
        <p>Release Date: {game['release-date']}</p>
        <p>Maturity Level: {game['maturity-level']}</p>
      </div>
      {/* // ADD THE FAVORITE FUNCTIONALITY// to be edited in CSS */}
      <div className="favorite-container">
        <button className="favorite-button">
          <span role="img" aria-label="heart">💖</span> Favorite
        </button>
      </div>
      {/* for reviews //to be edited in CSS */}
      <div className="reviews-container">
        {/* Display reviews */}
      </div>
      {/* Link to navigate back to the Games page */}
      <Link to="/games">Back</Link>
    </div>
  );
}

export default GameDetail;