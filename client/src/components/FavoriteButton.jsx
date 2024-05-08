import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button'; // Import Button from Material-UI
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'; // For unfavorite icon
import FavoriteIcon from '@mui/icons-material/Favorite'; // For favorite icon

// FavoriteButton component definition with props gameId and userId
function FavoriteButton({ gameId, userId, gameStatId, updateGameStatId }) {

  // State to track if the game is favorited
  const [isFavorited, setIsFavorited] = useState(false);

  // useEffect hook to fetch game statistics on component mount and when gameId or userId changes
  useEffect(() => {
    // API call to fetch game statistics for the current user and game
    fetch(`http://localhost:8080/game-statistics/${gameId}/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.game_stats_id) {
          // Set the favorited state and game statistics ID from the fetched data
          setIsFavorited(data.favorited);
          updateGameStatId(data.game_stats_id);
        } else {
          // Reset states if no data is found
          setIsFavorited(false);
          updateGameStatId(null);
        }
      });
  }, [gameId, userId]);

  // Function to handle favorite/unfavorite actions
  const handleFavorite = () => {
    if (gameStatId) {
      // If gameStatId exists, update the favorited status using PATCH method
      fetch(`http://localhost:8080/game-statistics/${gameId}/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ favorited: !isFavorited }),
      })
        .then((res) => res.json())
        .then((data) => {
          // Update the favorited state based on the response
          setIsFavorited(data.favorited);
        });
    } else {
      // If gameStatId does not exist, create a new game statistic using POST method
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
          // Set the favorited state and game statistics ID from the newly created data
          setIsFavorited(true);
          updateGameStatId(data.game_stats_id);
        });
    }
  };

  // Render a button with dynamic properties based on the favorited state
  return (
    <div className="favorite-container">
      <Button
        variant="contained"
        color={isFavorited ? "secondary" : "primary"}
        startIcon={isFavorited ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        onClick={handleFavorite}
      >
        {isFavorited ? 'Unfavorite' : 'Favorite'}
      </Button>
    </div>
  );
}

export default FavoriteButton;