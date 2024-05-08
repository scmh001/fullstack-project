// Import necessary React and routing functionalities
import React, { useState } from 'react';
import './WishListGameCard.css'; // Import CSS for styling
import { Link } from 'react-router-dom'; // Import Link component for client-side routing

// Define the WishListGameCard component with props passed for game, user, and handleUnwishlist function
const WishListGameCard = ({ game, user, handleUnwishlist }) => {

  // Function to handle the deletion of a game from the wishlist
  const handleDelete = () => {
    // Perform a PATCH request to update the game's wishlist status
    fetch(`http://localhost:8080/game-statistics/${game.id}/${user.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json', // Set content type to JSON
      },
      body: JSON.stringify({ wish_listed: false }), // Send data as JSON string
    })
      .then((res) => res.json()) // Parse JSON response
      .then((data) => {
        handleUnwishlist(data.id); // Call handleUnwishlist with the game's id
      })
      .catch((error) => {
        console.error('Error deleting game from wishlist:', error); // Log errors if any
      });
  };

  // Render the component
  return (
    <div className="wishlist-game-card">
      {/* Button to delete the game from wishlist */}
      <button className="delete-button" onClick={handleDelete}>❌</button>
      <div className="left-column">
        {/* Display game image */}
        <img className="wishlist-game-image" src={game.image} alt={game.game_name} />
      </div>

      <div className="center-column">
        <div className="game-details">
          {/* Link to game details page */}
          <Link to={`/games/${game.id}`}>
            <h2>{game.game_name}</h2>
          </Link>
          
          {/* Display game reviews, or 'N/A' if not available */}
          <p>Reviews: {game.reviews ? game.reviews : 'N/A'}</p>
          {/* Display game description, or 'N/A' if not available */}
          <p>Description: {game.description ? game.description :'N/A'}</p>
        </div>
      </div>

      <div className="right-column">
        <div className="game-details">
          {/* Display game rating, or 'N/A' if not available */}
          <p>Rating: {game.rating ? game.rating : 'N/A'} ⭐</p>
          {/* Display game genre, or 'N/A' if not available */}
          <p>Genre: {game.genre ? game.genre : 'N/A'}</p>
          {/* Display game developer, or 'N/A' if not available */}
          <p>Developer: {game.developer ? game.developer : 'N/A'}</p>
          {/* Display game release date, or 'N/A' if not available */}
          <p>Release Date: {game.releaseDate ? game.releaseDate : 'N/A'}</p>
          {/* Display game maturity level, or 'N/A' if not available */}
          <p>Maturity Level: {game.maturityLevel ? game.maturityLevel : 'N/A'}</p>
          {/* Display game platforms, or 'N/A' if not available */}
          <p>Platforms: {game.platform ? game.platform : 'N/A'}</p>
          {/* Link to purchase the game on Amazon */}
          <a
            href={`https://www.amazon.com/s?k=${encodeURIComponent(game.game_name)}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="amazon-link"
          >
          Buy Now
          </a>
        </div>
      </div>
    </div>
  );
};

// Export the WishListGameCard component for use in other parts of the application
export default WishListGameCard;