import React from 'react';
import './FavoritesGameCard.css';
import { Link } from 'react-router-dom';

// Component for displaying a single game card in the favorites list
const FavoritesGameCard = ({ game, user, handleUnfavorite }) => {
    // Extract the top three comments from the game object or set to empty if none exist
    const topThreeComments = game.comments ? game.comments.slice(0, 3) : [];

    // Function to handle the removal of a game from favorites
    const handleDelete = () => {
      // Make a PATCH request to update the favorited status of the game
      fetch(`http://localhost:8080/game-statistics/${game.id}/${user.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ favorited: false }),
      })
        .then((res) => res.json())
        .then((data) => {
          // Call the handleUnfavorite function passed as a prop with the game id
          handleUnfavorite(data.id);
        })
        .catch((error) => {
          // Log any errors to the console
          console.error('Error deleting game from favorites:', error);
        });
    };

    return (
    <div className="favorites-game-card">
        {/* Button to remove the game from favorites */}
        <button className="delete-button" onClick={handleDelete}>❌</button>
        {/* Game image */}
        <img src={game.image} alt={game.game_name} />
        {/* Link to the game's detailed page */}
        <Link to={`/games/${game.id}`}>
          <h2>{game.game_name}</h2>
        </Link>
        {/* Display the game rating or 'N/A' if not available */}
        <p>Rating: {game.rating ? game.rating : 'N/A'} ⭐</p>
        {/* Display the game genre */}
        <p>Genre: {game.genre}</p>
        {/* Map through the top three comments and display them */}
        {topThreeComments.map((comment, index) => (
          <p key={index}>Comment {index + 1}: {comment}</p>
        ))}
        {/* Display placeholders for missing comments if less than 3 exist */}
        {game.comments && game.comments.length < 3 &&
          Array.from({ length: 3 - game.comments.length }).map((_, index) => (
            <p key={index + game.comments.length}>Comment {index + game.comments.length + 1}: N/A</p>
          ))
        }
    </div>
  );
};

export default FavoritesGameCard;