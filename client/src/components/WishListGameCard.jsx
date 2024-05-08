import React from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const WishListGameCard = ({ game, user, handleUnwishlist }) => {
  const handleDelete = () => {
    fetch(`http://localhost:8080/game-statistics/${game.id}/${user.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ wish_listed: false }),
    })
      .then((res) => res.json())
      .then((data) => {
        handleUnwishlist(data.id);
      })
      .catch((error) => {
        console.error('Error deleting game from wishlist:', error);
      });
  };

  return (
    <Grid container spacing={0}>
      <Grid item xs={12} sm={10} md={10} lg={10}>
        <Card>
          <CardMedia
            component="img"
            image={game.image}
            alt={game.game_name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              <RouterLink to={`/games/${game.id}`}>{game.game_name}</RouterLink>
            </Typography>
            <Typography color="text.secondary">
            Reviews: {game.reviews || 'N/A'}
          </Typography>
          <Typography color="text.secondary">
            Description: {game.description || 'N/A'}
          </Typography>
          <Typography color="text.secondary">
            Rating: {game.rating || 'N/A'} ⭐
          </Typography>
          <Typography color="text.secondary">
            Genre: {game.genre || 'N/A'}
          </Typography>
          <Typography color="text.secondary">
            Developer: {game.developer || 'N/A'}
          </Typography>
          <Typography color="text.secondary">
            Release Date: {game.releaseDate || 'N/A'}
          </Typography>
          <Typography color="text.secondary">
            Maturity Level: {game.maturityLevel || 'N/A'}
          </Typography>
          <Typography color="text.secondary">
            Platforms: {game.platform || 'N/A'}
          </Typography>
            <Button
              href={`https://www.amazon.com/s?k=${encodeURIComponent(game.game_name)}`}
              target="_blank"
              rel="noopener noreferrer"
              variant="contained"
              color="primary"
            >
              Buy Now
            </Button>
          </CardContent>
        </Card>
        <Button
          onClick={handleDelete}
          variant="contained"
          color="error"
          sx={{ marginTop: 0 }}
        >
          Remove
        </Button>
      </Grid>
    </Grid>
  );
};

export default WishListGameCard;