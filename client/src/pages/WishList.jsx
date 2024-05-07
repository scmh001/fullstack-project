import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import WishListGameCard from '@/components/WishListGameCard.jsx';

// Define the WishListGames component with destructured user prop
function WishListGames({user}) {
  // State for storing the list of games
  const [games, setGames] = useState([]);
  // State for tracking the current page of pagination
  const [currentPage, setCurrentPage] = useState(1);
  // State for setting the number of games displayed per page
  const [gamesPerPage] = useState(12);
  // State to trigger re-fetching of games when a game is deleted
  const [deleteGame, setDeleteGame] = useState(false);

  // useEffect to fetch games when the component mounts or when user or deleteGame changes
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

  // Function to handle removing a game from the wishlist
  const handleUnwishlist = (gameId) => {
    setGames(games.filter((game) => game.id !== gameId));
    setDeleteGame(prev => !prev);
  }

  // Calculate the index of the last game on the current page
  const indexOfLastGame = currentPage * gamesPerPage;
  // Calculate the index of the first game on the current page
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  // Slice the games array to get only the games for the current page
  const currentGames = Array.isArray(games) ? games.slice(indexOfFirstGame, indexOfLastGame) : [];

  // Function to change the current page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      {/* Container for displaying game cards */}
      <div className="game-cards-container">
        {currentGames.map((game) => (
          <WishListGameCard key={game.id} game={game} handleUnwishlist={handleUnwishlist} user={user}/>
        ))}
      </div>
      {/* Pagination controls */}
      <div className="pagination">
        {currentPage > 1 && (
          <button onClick={() => paginate(currentPage - 1)}>Previous Page</button>
        )}
        {currentPage < Math.ceil(games.length / gamesPerPage) && (
          <button onClick={() => paginate(currentPage + 1)}>Next Page</button>
        )}
      </div>
    </div>
  );
}

export default WishListGames;