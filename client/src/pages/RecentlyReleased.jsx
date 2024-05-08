import React, { useState, useEffect } from 'react';
import GameCard from '@/components/GameCard'; // Importing the GameCard component
import { Box } from '@mui/material'; // Importing Box from Material-UI for layout

// Component to display recently released games
function RecentlyReleased() {
    const [games, setGames] = useState([]); // State to hold the list of games

    useEffect(() => {
        // Effect to fetch game data from the server
        fetch('http://localhost:8080/games') // Fetching games from the local server
        .then(res => res.json()) // Parsing the response as JSON
        .then(gameData => {
            // Sorting the games by release date in descending order
            const sortedGames = gameData.sort((a, b) => {
                return new Date(b.release_date) - new Date(a.release_date);
            });
            setGames(sortedGames); // Updating the state with the sorted games
        })
        .catch(error => console.error("Failed to fetch games", error)); // Logging errors to the console
    }, []); // Empty dependency array means this effect runs only once after the initial render

    return (
        <Box className="games-container"> {/* Container the games */}
            <Box className="game-cards-container"> {/* Container for the game cards*/}
                {games.map((game) => (
                    <GameCard key={game.name} game={game} /> // Rendering a GameCard for each game
                ))}
            </Box>
        </Box>
    );
}

export default RecentlyReleased; // Exporting the component for use in other parts of the application