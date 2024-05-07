import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import GameReviewCard from '../components/GameReviewCard';
import FavoriteButton from '../components/FavoriteButton';
import WishlistButton from '../components/WishlistButton';
import ReviewForm from '../components/ReviewForm';
import { Box, Typography, Button, Card, CardContent, CardMedia, Grid, CircularProgress } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function GameDetail({ user }) {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [gameStats, setGameStats] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/games/${id}`)
      .then((res) => res.ok ? res.json() : console.error('Something went wrong...'))
      .then((selectedGame) => setGame(selectedGame))
      .catch((error) => console.error(error));

    fetch(`http://localhost:8080/game-statistic/${id}`)
      .then((res) => res.json())
      .then((data) => setGameStats(data))
      .catch((error) => console.error(error));

    window.scrollTo(0, 0);
  }, [id]);

  const updateGameStats = () => {
    fetch(`http://localhost:8080/game-statistic/${id}`)
      .then((res) => res.json())
      .then((data) => setGameStats(data))
      .catch((error) => console.error(error));
  };

  if (!game || !gameStats) {
    return <Box display="flex" justifyContent="center"><CircularProgress /></Box>;
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>{game.game_name}</Typography>
      <Grid container spacing={5}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              height="700"
              image={game.image}
              alt={game.game_name}
            />
            <CardContent>
              <Typography variant="body2">Genre: {game.genre}</Typography>
              <Typography variant="body2">System: {game.system}</Typography>
              <Typography variant="body2">Developer: {game.developer}</Typography>
              <Typography variant="body2">Release Date: {game.release_date}</Typography>
              <Typography variant="body2">Maturity Level: {game.maturity_level}</Typography>
              <Typography variant="body2">Description: {game.description}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={5}>
          {user && (
            <Box>
              <FavoriteButton gameId={game.id} userId={user.id} />
              <WishlistButton gameId={game.id} userId={user.id} />
            </Box>
          )}
          {user && game && (
            <ReviewForm gameId={game.id} userId={user.id} userName={user.username} updateGameStats={updateGameStats} />
          )}
          <Box sx={{ mt: 2 }}>
            {gameStats.length > 0 ? (
              gameStats.map((stat) => (
                <GameReviewCard key={stat.game_stats_id} gameStats={stat} />
              ))
            ) : (
              <Typography>No reviews available.</Typography>
            )}
          </Box>
        </Grid>
      </Grid>
      <Button variant="contained" startIcon={<ArrowBackIcon />} component={Link} to="/games">
        Back
      </Button>
    </Box>
  );
}

export default GameDetail;