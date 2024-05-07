import React, { useState, useEffect } from 'react';
import GameCard from '@/components/GameCard';
import { Box, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import './Games.css';

function Games() {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [filter, setFilter] = useState({
    releaseDate: '',
    ratingOrder: '',
    genre: '',
    system: '',
    developer: '', 
  });

  // New state variables for dropdown options
  const [genres, setGenres] = useState([]);
  const [systems, setSystems] = useState([]);
  const [developers, setDevelopers] = useState([]);

  useEffect(() => {
    // Fetch games and extract unique genres, systems, and developers
    fetch('http://localhost:8080/games')
      .then(res => res.json())
      .then(gameData => {
        setGames(gameData);
        setFilteredGames(gameData);

        // Extract unique genres, systems, and developers
        const uniqueGenres = [...new Set(gameData.map(game => game.genre))];
        const uniqueSystems = [...new Set(gameData.map(game => game.system))];
        const uniqueDevelopers = [...new Set(gameData.map(game => game.developer))];

        setGenres(uniqueGenres);
        setSystems(uniqueSystems);
        setDevelopers(uniqueDevelopers);
      })
      .catch(error => console.error("Failed to fetch games", error));
  }, []);

  const applyFilters = () => {
    let updatedGames = games;
  
    // Filter by genre
    if (filter.genre) {
      updatedGames = updatedGames.filter(game => game.genre === filter.genre);
    }
  
    // Filter by system
    if (filter.system) {
      updatedGames = updatedGames.filter(game => game.system === filter.system);
    }
  
    // Filter by developer
    if (filter.developer) {
      updatedGames = updatedGames.filter(game => game.developer === filter.developer);
    }
  
    // Update the filteredGames state
    setFilteredGames(updatedGames);
  };

  const resetFilters = () => {
    setFilter({
      releaseDate: '',
      ratingOrder: '',
      genre: '',
      system: '',
      developer: '',
    });
    setFilteredGames(games);
  };

  return (
    <Box className="games-container">
      <Box className="filter-bar">
        {/* Genre dropdown */}
        <FormControl variant="filled" sx={{ m: 0.1, minWidth: 100 }}>
          <InputLabel>Genre</InputLabel>
          <Select
            value={filter.genre}
            onChange={(e) => setFilter({ ...filter, genre: e.target.value })}
          >
            {genres.map((genre, index) => (
              <MenuItem key={index} value={genre}>
                {genre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {/* System dropdown */}
        <FormControl variant="filled" sx={{ m: -.5, minWidth: 100, minHeight: 0.5 }}>
          <InputLabel>System</InputLabel>
          <Select
            value={filter.system}
            onChange={(e) => setFilter({ ...filter, system: e.target.value })}
          >
            {systems.map((system, index) => (
              <MenuItem key={index} value={system}>
                {system}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {/* Developer dropdown */}
        <FormControl variant="filled" sx={{ m: -.5, minWidth: 120, minHeight: 0.5 }}>
          <InputLabel>Developer</InputLabel>
          <Select
            value={filter.developer}
            onChange={(e) => setFilter({ ...filter, developer: e.target.value })}
          >
            {developers.map((developer, index) => (
              <MenuItem key={index} value={developer}>
                {developer}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" onClick={applyFilters}>
          Apply Filters
        </Button>
        <Button variant="outlined" onClick={resetFilters}>
          Reset Filters
        </Button>
      </Box>
      <Box className="game-cards-container">
        {filteredGames.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </Box>
    </Box>
  );
}

export default Games;