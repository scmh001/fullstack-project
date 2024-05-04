import React, { useState, useEffect, useParams } from 'react';
import { Link } from 'react-router-dom';
import FavoritesGameCard from '@/components/FavoritesGameCard.jsx';


function Favorites({user}) {
  const [games, setGames] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); //initialize current page state with initial value of 1 for page 1
  const [gamesPerPage] = useState(12); //initial value of 12 games per page

  
  useEffect(() => {
    if (user && user.id) {
      fetch(`http://localhost:8080/favorites/${user.id}`)
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
  }, [user]);

  
  // Pagination
  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = Array.isArray(games) ? games.slice(indexOfFirstGame, indexOfLastGame) : [];

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  return (
    <div>
    {!games ? (
      <div className="no-favorites-message">
        <h2>You haven't favorited any games yet</h2>
      </div>
    ) : (
      <>
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
      </>
    )}
  </div>
);
}

export default Favorites;