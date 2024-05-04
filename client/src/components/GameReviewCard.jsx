import React from 'react';

function GameReviewCard({ gameStats }) {
  return (
    <div className="review-item">
      {gameStats.comments && <p>{gameStats.comments}</p>}
      {gameStats.rating && (
        <div className="rating-container">
          {/* Render rating component or display rating value */}
          <p>Rating: {gameStats.rating}</p>
        </div>
      )}
    </div>
  );
}

export default GameReviewCard;