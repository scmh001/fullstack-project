import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function HomeGameReviewCard({ gameStats }) {
  return (
    <Card sx={{ display: 'flex', marginBottom: 2 }}>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={gameStats.game.image}
        alt={gameStats.game.game_name}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {gameStats.game.game_name}
          </Typography>
          {gameStats.rating && (
            <Typography variant="subtitle1" color="text.secondary" component="div">
              Rating: {gameStats.rating}
            </Typography>
          )}
          <Typography variant="body2" color="text.secondary">
            {gameStats.comments}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            User: {gameStats.user.username}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}

export default HomeGameReviewCard;