import React, { useState, useEffect } from 'react';
import GameCard from '@/components/GameCard';
import { Box } from '@mui/material';

function RecentlyReleased() {
    const [games, setGames] = useState([]);

    useEffect(() => {
        // Fetch games
        fetch('http://localhost:8080/games')
        .then(res => res.json())
        .then(gameData => {
            // Sort games by release date
            const sortedGames = gameData.sort((a, b) => {
                return new Date(b.release_date) - new Date(a.release_date);
            });
            setGames(sortedGames);
        })
        .catch(error => console.error("Failed to fetch games", error));
    }, []);

    return (
        <Box className="games-container">
            <Box className="game-cards-container">
                {games.map((game) => (
                    <GameCard key={game.name} game={game} />
                ))}
            </Box>
        </Box>
    );
}

export default RecentlyReleased;