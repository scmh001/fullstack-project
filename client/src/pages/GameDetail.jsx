import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import GameReviewCard from '../components/GameReviewCard';
import FavoriteButton from '../components/FavoriteButton';
import WishlistButton from '../components/WishlistButton';
import ReviewForm from '../components/ReviewForm';
import { Box, Typography, Button, Card, CardContent, CardMedia, Grid, CircularProgress } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// Define the GameDetail functional component with props
function GameDetail({ user }) {
  // Retrieve the game ID from the URL parameters
  const { id } = useParams();
  // State to store the game details
  const [game, setGame] = useState(null);
  // State to store game statistics
  const [gameStats, setGameStats] = useState([]);
  const [gameStatId, setGameStatId] = useState(null);

  // useEffect hook to fetch game statistics on component mount or when gameId or userId changes
  useEffect(() => {
    // Fetch game statistics for the current user and game
    if (user && user.id) {
    fetch(`http://localhost:8080/game-statistics/${id}/${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        // If game statistics exist, update state with the fetched data
        if (data.game_stats_id) {
          setGameStatId(data.game_stats_id);
        } else {
          // If no game statistics exist, set default state
          setGameStatId(null);
        }
      });
    }
  }, []); // Dependencies array for useEffect

  // useEffect hook to fetch game details and statistics on component mount or when id changes
  useEffect(() => {
    // Fetch game details from the server
    fetch(`http://localhost:8080/games/${id}`)
      .then((res) => res.ok ? res.json() : console.error('Something went wrong...'))
      .then((selectedGame) => setGame(selectedGame))
      .catch((error) => console.error(error));

    // Fetch game statistics from the server
    fetch(`http://localhost:8080/game-statistic/${id}`)
      .then((res) => res.json())
      .then((data) => setGameStats(data))
      .catch((error) => console.error(error));

    // Scroll to the top of the page when the component is rendered
    window.scrollTo(0, 0);
  }, [id]);

  // Function to update game statistics
  const updateGameStats = () => {
    fetch(`http://localhost:8080/game-statistic/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setGameStats(data)
        console.log(data)
      })
      .catch((error) => console.error(error));
  };

  const updateGameStatId = (gameStatId) => {
    setGameStatId(gameStatId)
  };
  // Render a loading spinner if game or gameStats data is not yet available
  if (!game || !gameStats) {
    return <Box display="flex" justifyContent="center"><CircularProgress /></Box>;
  }

  // Main component render
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
              <FavoriteButton gameId={game.id} userId={user.id} gameStatId={gameStatId} updateGameStatId={updateGameStatId} />
              <WishlistButton gameId={game.id} userId={user.id} gameStatId={gameStatId} updateGameStatId={updateGameStatId}/>
            </Box>
          )}
          {user && game && (
            <ReviewForm gameId={game.id} userId={user.id} userName={user.username} updateGameStats={updateGameStats} gameStatId={gameStatId} updateGameStatId={updateGameStatId}/>
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