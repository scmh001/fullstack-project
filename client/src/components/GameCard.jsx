import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const GameCard = ({ game }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="280"
        image={game.image}
        alt={game.game_name}
      />
      <CardContent>
        <Link to={`/games/${game.id}`}>
          <Typography gutterBottom variant="h5" component="div">
            {game.game_name}
          </Typography>
        </Link>
        <Typography variant="body2" color="text.secondary">
          Genre: {game.genre}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Rating: {game.rating ? game.rating : 'N/A'} ⭐
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Description: {game.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default GameCard;