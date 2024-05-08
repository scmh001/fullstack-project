import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

// Component to display game review information including rating, user, and comments
function GameReviewCard({ gameStats }) {
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
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

export default GameReviewCard;