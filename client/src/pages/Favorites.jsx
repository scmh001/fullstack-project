import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FavoritesGameCard from '@/components/FavoritesGameCard.jsx';

import gameData from '@/assets/TEST.json';

function Favorites() {
  const [games, setGames] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); //initialize current page state with initial value of 1 for page 1
  const [gamesPerPage] = useState(12); //initial value of 12 games per page

  useEffect(() => {
    setGames(gameData);
  }, []);

  // Pagination
  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = games.slice(indexOfFirstGame, indexOfLastGame);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      {/* Game cards container */}
      <div className="game-cards-container">
        {currentGames.map((game) => (
          <FavoritesGameCard key={game.id} game={game} />
        ))}
      </div>
      {/* Pagination */}
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

export default Favorites;