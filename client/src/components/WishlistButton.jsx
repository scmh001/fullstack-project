import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button'; // Import Button from Material-UI
import StarIcon from '@mui/icons-material/Star'; // Import Material-UI icon for starred
import StarBorderIcon from '@mui/icons-material/StarBorder'; // Import Material-UI icon for unstarred

// Define a functional component WishlistButton that takes gameId and userId as props
function WishlistButton({ gameId, userId, gameStatId, updateGameStatId}) {
  
  // State to track if the game is wishlisted
  const [isWishlisted, setIsWishlisted] = useState(false);

  // useEffect hook to fetch game statistics on component mount or when gameId or userId changes
  useEffect(() => {
    // Fetch game statistics for the current user and game
    fetch(`http://localhost:8080/game-statistics/${gameId}/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        // If game statistics exist, update state with the fetched data
        if (data.game_stats_id) {
          setIsWishlisted(data.wish_listed);
          updateGameStatId(data.game_stats_id);
        } else {
          // If no game statistics exist, set default state
          setIsWishlisted(false);
          updateGameStatId(null);
        }
      });
  }, [gameId, userId]); // Dependencies array for useEffect

  // Function to handle wishlist button click
  const handleWishlist = () => {
    // If a GameStatistics instance exists, update the wish_listed status
    if (gameStatId) {
      fetch(`http://localhost:8080/game-statistics/${gameId}/${userId}`, {
        method: 'PATCH', // Use PATCH method to update existing data
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ wish_listed: !isWishlisted }), // Toggle wish_listed status
      })
        .then((res) => res.json())
        .then((data) => setIsWishlisted(data.wish_listed)); // Update state with new wish_listed status
    } else {
      // If not, create a new GameStatistics instance with wish_listed set to true
      fetch(`http://localhost:8080/game-statistics`, {
        method: 'POST', // Use POST method to create new data
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
          // Update state with new game statistics data
          setIsWishlisted(true);
          updateGameStatId(data.game_stats_id);
        });
    }
  };

  // Render the wishlist button with dynamic text and icon based on isWishlisted state
  return (
    <div className="wishlist-container">
      <Button
        variant="contained"
        color="primary"
        startIcon={isWishlisted ? <StarIcon /> : <StarBorderIcon />}
        onClick={handleWishlist}
      >
        {isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
      </Button>
    </div>
  );
}

export default WishlistButton; // Export WishlistButton component for use in other parts of the application