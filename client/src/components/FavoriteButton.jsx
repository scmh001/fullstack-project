import React, { useState, useEffect } from 'react';

function FavoriteButton({ gameId, userId }) {

  const [isFavorited, setIsFavorited] = useState(false);
  const [gameStatId, setGameStatId] = useState(null);

  useEffect(() => {
    // Fetch game statistics for the current user and game
    fetch(`http://localhost:8080/game-statistics/${gameId}/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.game_stats_id) {
          setIsFavorited(data.favorited);
          setGameStatId(data.game_stats_id);
        } else {
          setIsFavorited(false);
          setGameStatId(null);
        }
      });
  }, [gameId, userId]);

  const handleFavorite = () => {
    if (gameStatId) {
      fetch(`http://localhost:8080/game-statistics/${gameId}/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ favorited: !isFavorited }),
      })
        .then((res) => res.json())
        .then((data) => {
          setIsFavorited(data.favorited);
        });
    } else {
      fetch(`http://localhost:8080/game-statistics`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          game_id: gameId,
          favorited: true,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setIsFavorited(true);
          setGameStatId(data.game_stats_id);
        });
    }
  };

  return (
    <div className="favorite-container">
      <button className="favorite-button" onClick={handleFavorite}>
        <span role="img" aria-label="heart">
          {isFavorited ? '💖' : '🤍'}
        </span>{' '}
        {isFavorited ? 'Unfavorite' : 'Favorite'}
      </button>
    </div>
  );
}

export default FavoriteButton;