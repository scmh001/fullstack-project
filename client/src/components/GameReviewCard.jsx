import React from 'react';
import './GameReviewCard.css';

function GameReviewCard({ gameStats }) {

  
  return (
    <div className="review-card"> {/* Wrap the contents in a div with class "review-card" */}
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