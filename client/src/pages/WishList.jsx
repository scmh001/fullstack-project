import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import WishListGameCard from '@/components/WishListGameCard.jsx';
import Pagination from '@mui/material/Pagination'; // Importing Pagination from Material-UI
import Stack from '@mui/material/Stack'; // Importing Stack for layout

function WishListGames({user}) {
  const [games, setGames] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage] = useState(12);
  const [deleteGame, setDeleteGame] = useState(false);

  useEffect(() => {
    if (user && user.id) {
      fetch(`http://localhost:8080/wishlist/${user.id}`)
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            return console.error("Something went wrong with your GET request");
          }
        })
        .then((gameData) => {
          setGames(gameData);
        });
    }
  }, [user, deleteGame]);

  const handleUnwishlist = (gameId) => {
    setGames(games.filter((game) => game.id !== gameId));
    setDeleteGame(prev => !prev);
  }

  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = Array.isArray(games) ? games.slice(indexOfFirstGame, indexOfLastGame) : [];

  // Updated paginate function to work with Material-UI Pagination component
  const paginate = (event, value) => setCurrentPage(value);

  return (
    <div>
      <div className="game-cards-container">
        {currentGames.map((game) => (
          <WishListGameCard key={game.id} game={game} handleUnwishlist={handleUnwishlist} user={user}/>
        ))}
      </div>
      {/* Using Material-UI Stack for layout and Pagination for page controls */}
      <Stack spacing={2} direction="row" justifyContent="center" alignItems="center" className="pagination">
        <Pagination
          count={Math.ceil(games.length / gamesPerPage)}
          page={currentPage}
          onChange={paginate}
          color="primary" // You can customize the color
        />
      </Stack>
    </div>
  );
}

export default WishListGames;