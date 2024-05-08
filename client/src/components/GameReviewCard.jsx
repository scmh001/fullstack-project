import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

function GameReviewCard({ gameStats }) {
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= rating ? <StarIcon key={i} color="warning" /> : <StarBorderIcon key={i} />
      );
    }
    return stars;
  };

  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardContent>
        {gameStats.rating && (
          <Box>
            <Typography variant="subtitle1" component="div">
              Rating: {gameStats.rating}
              <Box sx={{ display: 'flex' }}>{renderStars(gameStats.rating)}</Box>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              User: {gameStats.user.username}
            </Typography>
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