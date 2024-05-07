import React from 'react';
import { Card, CardMedia, CardContent, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';

// Custom styles for the component
const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: '100vw', // Set the maximum width to 100% of the viewport width
    height: '80vh', // Set the height to 100% of the viewport height
    display: 'flex',
    flexDirection: 'column',
  },
  media: {
    height: '100%', // Allocate 60% of the card height to the image
    width: '100%', // Ensure the image spans the full width of the card
    objectFit: 'cover', // Cover the area without distorting the aspect ratio
  },
  content: {
    height: '40%', // Allocate the remaining 40% of the card height to content
    overflow: 'auto' // Add scroll to content if it overflows
  },
  typography: {
    // Increase font size for all Typography components within this card
    fontSize: '2rem',
  }
}));

const FavoritesGameCard = ({ game, user, handleUnfavorite }) => {
  const classes = useStyles();

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
      handleUnfavorite(data.id);
    })
    .catch((error) => {
      console.error('Error deleting game from favorites:', error);
    });
  };

  return (
    <Card className={classes.card}>
      <IconButton aria-label="delete" onClick={handleDelete}>
        <DeleteIcon />
      </IconButton>
      <CardMedia
        className={classes.media}
        image={game.image}
        title={game.game_name}
      />
      <CardContent className={classes.content}>
      <Link to={`/games/${game.id}`}>
        <Typography gutterBottom variant="h5" component="h2" className={classes.typography}>
          {game.game_name}
        </Typography>
      </Link>
        <Typography variant="body2" color="textSecondary" component="p" className={classes.typography}>
          Rating: {game.rating ? game.rating : 'N/A'} ⭐
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p" className={classes.typography}>
          Genre: {game.genre}
        </Typography>
        {game.comments && game.comments.slice(0, 3).map((comment, index) => (
          <Typography key={index} variant="body2" color="textSecondary" component="p" className={classes.typography}>
            Comment {index + 1}: {comment}
          </Typography>
        ))}
      </CardContent>
    </Card>
  );
};

export default FavoritesGameCard;