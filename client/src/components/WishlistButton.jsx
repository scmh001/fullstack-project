import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button'; // Import Button from Material-UI
import StarIcon from '@mui/icons-material/Star'; // Import Material-UI icon for starred
import StarBorderIcon from '@mui/icons-material/StarBorder'; // Import Material-UI icon for unstarred

// Define a functional component WishlistButton that takes gameId and userId as props
function WishlistButton({ gameId, userId }) {
  
  // State to track if the game is wishlisted
  const [isWishlisted, setIsWishlisted] = useState(false);
  // State to store the game statistics ID
  const [gameStatId, setGameStatId] = useState(null);

  // useEffect hook to fetch game statistics on component mount or when gameId or userId changes
  useEffect(() => {
    // Fetch game statistics for the current user and game
    fetch(`http://localhost:8080/game-statistics/${gameId}/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        // If game statistics exist, update state with the fetched data
        if (data.game_stats_id) {
          setIsWishlisted(data.wish_listed);
          setGameStatId(data.game_stats_id);
        } else {
          // If no game statistics exist, set default state
          setIsWishlisted(false);
          setGameStatId(null);
        }
      });
  }, [gameId, userId]); // Dependencies array for useEffect

  // Function to handle wishlist button click
  const handleWishlist = () => {
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
      // Check if favorited state is true, if so, set it to false
      const favorited = isFavorited ? false : null;
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