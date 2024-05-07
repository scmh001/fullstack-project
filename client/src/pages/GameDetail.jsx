import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import GameReviewCard from '../components/GameReviewCard';
import FavoriteButton from '../components/FavoriteButton';
import WishlistButton from '../components/WishlistButton';
import ReviewForm from '../components/ReviewForm';
import './GameDetail.css';

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

    fetch(`http://localhost:8080/game-statistic/${id}`)
      .then((res) => res.json())
      .then((data) => setGameStats(data))
      .catch((error) => console.error(error));

    window.scrollTo(0, 0);
  }, [id]);

  const updateGameStats = () => {
    fetch(`http://localhost:8080/game-statistic/${id}`)
      .then((res) => res.json())
      .then((data) => setGameStats(data))
      .catch((error) => console.error(error));
  };

  if (!game || !gameStats) {
    return <div>Loading...</div>;
  }

  return (
    <div className="game-detail-container">
      <h1 className="h1-dp">{game.game_name}</h1>
      <div className="details-container">
        <div className="image-column">
          <img className="details-image" src={game.image} alt={game.game_name} />
        </div>
        <div className="details-column">
          <div className="details-list-dp">
            <p className="game-detail-text">Genre: {game.genre}</p>
            <p className="game-detail-text">System: {game.system}</p>
            <p className="game-detail-text">Developer: {game.developer}</p>
            <p className="game-detail-text">Release Date: {game.release_date}</p>
            <p className="game-detail-text">Maturity Level: {game.maturity_level}</p>
            <p className="game-detail-text">Description: {game.description}</p>
          </div>
          {user && (
            <div className="favorite-wishlist-container">
              <FavoriteButton gameId={game.id} userId={user.id} />
              <WishlistButton gameId={game.id} userId={user.id} />
            </div>
          )}
          {user && game && (
            <div className="review-form-container">
              <ReviewForm gameId={game.id} userId={user.id} userName={user.username} updateGameStats={updateGameStats} />
            </div>
          )}
          <div className="reviews-container-detailpage">
            {gameStats && gameStats.length > 0 ? (
              gameStats.map((stat) => (
                <GameReviewCard key={stat.game_stats_id} gameStats={stat} />
              ))
            ) : (
              <p>No reviews available.</p>
            )}
          </div>
        </div>
      </div>
      <Link className="link-back" to="/games">
        Back
      </Link>
    </div>
  );
}

export default GameDetail;