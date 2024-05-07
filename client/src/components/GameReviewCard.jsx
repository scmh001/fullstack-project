import React from 'react';

function GameReviewCard({ gameStats }) {
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(<span key={i} className={i <= rating ? 'star gold-star' : 'star'}>&#9733;</span>);
    }
    return stars;
  };
  
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