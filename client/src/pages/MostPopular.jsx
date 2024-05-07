import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import GameCard from '@/components/GameCard';
import { Box, Button } from '@mui/material'

function MostPopular() {
    const [games, setGames] = useState([]);

    useEffect(() => {
        //fetch games sorted by rating in desc order
        fetch('http://localhost:8080/games?sort=rating&order=desc')
        .then(res => res.json())
        .then(gameData => {
            // Sort games by rating in descending order
            const sortedGames = gameData.sort((a, b) => b.rating - a.rating);
            setGames(sortedGames);
        })
        .catch(error => console.error("failed to fetch games", error))
    }, [])

    return (
        <Box className="games-container">
        
          <Box className="game-cards-container">
            {games.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </Box>
        </Box>
      );
    }
    
    export default MostPopular;