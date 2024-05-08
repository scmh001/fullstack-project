import React, { useState, useEffect } from 'react'
import { Box } from '@mui/material'
import GameCard from '@/components/GameCard';

function MostPopular() {
    const [games, setGames] = useState([]);

    useEffect(() => {
        // Fetch games sorted by rating in descending order from the server
        fetch('http://localhost:8080/games?sort=rating&order=desc')
        .then(res => res.json())
        .then(gameData => {
            // Update state with the fetched games
            setGames(gameData);
        })
        .catch(error => console.error("Failed to fetch games", error))
    }, [])

    return (
        <Box className="games-container">
          <Box className="game-cards-container">
            {games.map((game) => (
              // Render each game using the GameCard component
              <GameCard key={game.id} game={game} />
            ))}
          </Box>
        </Box>
      );
    }
    
export default MostPopular;