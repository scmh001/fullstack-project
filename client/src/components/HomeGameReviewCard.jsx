import React from 'react';

function HomeGameReviewCard({ gameStats }) {
  return (
    <div className="review-card-container">
      <div className="review-item">
        {/* Left section */}
        <div className="left-section">
          {/* Game title */}
          <h2 className="game-title">{gameStats.game.game_name}</h2>
          {/* Image */}
          <img src={gameStats.game.image_url} alt={gameStats.game.game_name} className="game-image" />
          {/* Rating */}
          {gameStats.rating && (
            <p className="rating">Rating: {gameStats.rating}</p>
          )}
        </div>
        
        {/* Right section */}
        <div className="right-section">
          {/* Comments */}
          <p className="comments">{gameStats.user.comments}</p>
          {/* User name */}
          <p className="user">User: {gameStats.user.username}</p>
        </div>
      </div>
    </div>
  );
}

export default HomeGameReviewCard;