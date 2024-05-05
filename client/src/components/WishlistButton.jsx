import React, { useState, useEffect } from 'react';

function WishlistButton({ gameId, userId }) {
  
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [gameStatId, setGameStatId] = useState(null);

  useEffect(() => {
    // Fetch game statistics for the current user and game
    fetch(`http://localhost:8080/game-statistics/${gameId}/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.game_stats_id) {
          setIsWishlisted(data.wish_listed);
          setGameStatId(data.game_stats_id);
        } else {
          setIsWishlisted(false);
          setGameStatId(null);
        }
      });
  }, [gameId, userId]);

  const handleWishlist = () => {
    // If a GameStatistics instance exists, update the wish_listed status
    // If not, create a new GameStatistics instance with wish_listed set to true
    if (gameStatId !== null) {
      fetch(`http://localhost:8080/game-statistics/${gameId}/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ wish_listed: !isWishlisted }),
      })
        .then((res) => res.json())
        .then((data) => setIsWishlisted(data.wish_listed));
    } else {
      fetch(`http://localhost:8080/game-statistics`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          game_id: gameId,
          wish_listed: true,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setIsWishlisted(true);
          setGameStatId(data.game_stats_id);
        });
    }
  };

  return (
    <div className="wishlist-container">
      <button className="wishlist-button" onClick={handleWishlist}>
        <span role="img" aria-label="star">
          {isWishlisted ? '⭐' : '☆'}
        </span>{' '}
        {isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
      </button>
    </div>
  );
}

export default WishlistButton;