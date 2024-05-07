import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import GameReviewCard from '../components/GameReviewCard';
import FavoriteButton from '../components/FavoriteButton';
import WishlistButton from '../components/WishlistButton';
import ReviewForm from '../components/ReviewForm';

function GameDetail({ user }) {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [gameStats, setGameStats] = useState([]);
  
  

  useEffect(() => {
    fetch(`http://localhost:8080/games/${id}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return console.error('Something went wrong...');
        }
      })
      .then((selectedGame) => setGame(selectedGame))
      .catch((error) => console.error(error));

    // Fetch game statistics
    fetch(`http://localhost:8080/game-statistic/${id}`)
      .then((res) => res.json())
      .then((data) => setGameStats(data));

    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, [id]);
  

  if (!game || !gameStats) {
    return <div>Loading...</div>;
  }

  return (
    <div className="game-detail-container">
      <h1 style={{ fontWeight: 'bold' }}>{game.game_name}</h1>
      <img src={game.image} alt={game.game_name} style={{ width: '50%', maxWidth: '300px' }} />
      <div className="rating-container">
        <p style={{ marginBottom: '5px' }}>Rating</p>
        <div className="stars-container">
          {/* Insert stars based on the game's rating */}
        </div>
      </div>
      <div className="details-list">
        <p>Genre: {game.genre}</p>
        <p>System: {game.system}</p>
        <p>Developer: {game.developer}</p>
        <p>Release Date: {game['release-date']}</p>
        <p>Maturity Level: {game['maturity-level']}</p>
      </div>
      {user && (
        <>
          <FavoriteButton gameId={game.id} userId={user.id} />
          <WishlistButton gameId={game.id} userId={user.id} />
        </>
      )}
      {user && game && (
      <ReviewForm gameId={game.id} userId={user.id} userName={user.username} />
      )}
      <div className="reviews-container">
      {gameStats && gameStats.length > 0 ? (
        gameStats.map((stat) => (
          <GameReviewCard key={stat.game_stats_id} gameStats={stat} />
        ))
      ) : (
      <p>No reviews available.</p>
      )}
      </div>
      <Link to="/games">Back</Link>
    </div>
  );
}

export default GameDetail;