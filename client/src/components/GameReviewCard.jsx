import React from 'react';
import { Card, CardContent, Typography, Box, Button } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

// Component to display game review information including rating, user, and comments
function GameReviewCard({ gameStats, handleDeleteReview, gameId, userId }) {
  // Function to render star icons based on the rating
  const renderStars = (rating) => {
    const stars = [];
    // Loop to create a star icon for each rating point
    for (let i = 1; i <= 5; i++) {
      stars.push(
        // Conditionally render a filled star for each point up to the rating, and an outlined star thereafter
        i <= rating ? <StarIcon key={i} color="warning" /> : <StarBorderIcon key={i} />
      );
    }
    return stars;
  };

  const handleDelete = () => {
      fetch(`http://localhost:8080/game-statistics/${gameId}/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ comments: null, rating: null })
      })
        .then((res) => {
          if(res.ok) {
            return res.json()
          }else {
            console.error(`Error deleting review`);
          }
        }).then((data) => {
          handleDeleteReview(data.game_stats_id)
        })
        .catch((error) => {
          console.error('Error deleting review', error)
        })

  };
 
  return (
    // Card component to encapsulate the review content
    <Card sx={{ marginBottom: 2 }}>
      <CardContent>
        {/* Conditional rendering to display the rating section only if rating exists */}
        {gameStats.rating && (
          <Box>
            {/* Display the numeric rating and corresponding star icons */}
            <Typography variant="subtitle1" component="div">
              Rating: {gameStats.rating}
              {/* Container for star icons, displayed in a row */}
              <Box sx={{ display: 'flex' }}>{renderStars(gameStats.rating)}</Box>
            </Typography>
            {/* Display the username of the reviewer */}
            <Typography variant="body2" color="text.secondary">
              User: {gameStats.user.username}
            </Typography>
            {/* Display the comment left by the reviewer */}
            <Typography variant="body2" color="text.secondary">
              Comment: {gameStats.comments}
            </Typography>
            <Button onClick={handleDelete} variant="contained" color="error" sx={{ marginTop: 2 }}>
              Delete
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

export default GameReviewCard;
