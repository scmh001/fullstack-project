import React from 'react';

function GameReviewCard({ gameStats }) {
  return (
    <div className="review-item">
      {gameStats.rating && (
        <div className="rating-container">
          <p>Rating: {gameStats.rating}</p>
          <p>User: {gameStats.user.username}</p>
          <p>Comment: {gameStats.comments}</p>
        </div>
      )}
    </div>
  );
}

export default GameReviewCard;