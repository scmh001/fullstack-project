import React from 'react';
// Importing necessary components from Material UI for styling and structure
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// Defining the HomeGameReviewCard functional component with gameStats prop
function HomeGameReviewCard({ gameStats }) {
  return (
    // Using the Card component to display each game review
    <Card sx={{ display: 'flex', marginBottom: 2 }}>
      {/* CardMedia is used to display the game's image */}
      <CardMedia
        component="img"
        sx={{ width: 151 }} // Setting the width of the image
        image={gameStats.game.image} // Source of the image
        alt={gameStats.game.game_name} // Alt text for the image
      />
      {/* Box component is used for layout purposes, allowing us to structure the content inside the card */}
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {/* CardContent holds the text content of the card */}
        <CardContent sx={{ flex: '1 0 auto' }}>
          {/* Displaying the game's name with Typography component */}
          <Typography component="div" variant="h5">
            {gameStats.game.game_name}
          </Typography>
          {/* Conditionally rendering the game's rating if it exists */}
          {gameStats.rating && (
            <Typography variant="subtitle1" color="text.secondary" component="div">
              Rating: {gameStats.rating} { /* Displaying the rating */}
            </Typography>
          )}
          {/* Displaying the game's comments */}
          <Typography variant="body2" color="text.secondary">
            {gameStats.comments}
          </Typography>
          {/* Displaying the username of the user who added the review */}
          <Typography variant="body2" color="text.secondary">
            User: {gameStats.user.username}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}

// Exporting the HomeGameReviewCard component for use in other parts of the application
export default HomeGameReviewCard;