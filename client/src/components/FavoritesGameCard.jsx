import React from 'react';
import { Card, CardMedia, CardContent, Typography, IconButton, Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';

// Component for displaying a favorite game card
const FavoritesGameCard = ({ game, user, handleUnfavorite }) => {
  // Function to handle the removal of a game from favorites
  const handleDelete = () => {
    fetch(`http://localhost:8080/game-statistics/${game.id}/${user.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ favorited: false }),
    })
    .then((res) => res.json())
    .then((data) => {
      handleUnfavorite(data.id); // Callback to update the parent component's state
    })
    .catch((error) => {
      console.error('Error deleting game from favorites:', error);
    });
  };

  return (
    <Card sx={{
      maxWidth: '100vw',
      height: '80vh',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <Grid container justifyContent="flex-end">
        <IconButton aria-label="delete" onClick={handleDelete} sx={{ m: 1 }}>
          <DeleteIcon />
        </IconButton>
      </Grid>
      <CardMedia
        component="img"
        sx={{
          height: '60%',
          width: '100%',
          objectFit: 'cover',
          borderRadius: '4px',
        }}
        image={game.image}
        title={game.game_name}
      />
      <CardContent sx={{
        height: '50%',
        overflow: 'auto',
        '& .MuiTypography-root': {
          fontSize: '2rem',
        }
      }}>
        <Link to={`/games/${game.id}`} style={{ textDecoration: 'none' }}>
          <Typography gutterBottom variant="h5" component="h2">
            {game.game_name}
          </Typography>
        </Link>
        <Typography variant="body2" color="textSecondary" component="p">
          Rating: {game.rating ? game.rating : 'N/A'} ⭐
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Genre: {game.genre}
        </Typography>
        {game.comments && game.comments.slice(0, 3).map((comment, index) => (
          <Typography key={index} variant="body2" color="textSecondary" component="p">
            Comment {index + 1}: {comment}
          </Typography>
        ))}
      </CardContent>
    </Card>
  );
};

export default FavoritesGameCard;