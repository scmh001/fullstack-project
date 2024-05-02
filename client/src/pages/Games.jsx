import React, { useState, useEffect } from 'react';
import GameCard from '@/components/GameCard.jsx';

import gameData from '@/assets/TEST.json';

function Games() {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage] = useState(12);
  const [filter, setFilter] = useState({
    releaseDate: null,
    ratingOrder: null,
    genre: null,
    system: null
  });

  useEffect(() => {
    // Fetch games from the backend or use local data
    setGames(gameData);
    setFilteredGames(gameData); // Initialize filteredGames with all games
  }, []);

  // Pagination
  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = filteredGames.slice(indexOfFirstGame, indexOfLastGame);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Filter games
  const applyFilters = () => {
    let filtered = [...games];

    // Apply filters
    if (filter.releaseDate) {
      switch (filter.releaseDate) {
        case 'before1990':
          filtered = filtered.filter(game => game['release-date'] < 1990);
          break;
        case 'before2000':
          filtered = filtered.filter(game => game['release-date'] < 2000);
          break;
        case 'before2010':
          filtered = filtered.filter(game => game['release-date'] < 2010);
          break;
        case 'before2020':
          filtered = filtered.filter(game => game['release-date'] < 2020);
          break;
        default:
          break;
      }
    }
    if (filter.ratingOrder) {
      filtered.sort((a, b) => {
        if (filter.ratingOrder === 'lowestToHighest') {
          return a.rating - b.rating;
        } else {
          return b.rating - a.rating;
        }
      });
    }
    if (filter.genre) {
      filtered = filtered.filter(game => game.genre === filter.genre);
    }
    if (filter.system) {
      filtered = filtered.filter(game => game.system === filter.system);
    }

    setFilteredGames(filtered);
    setCurrentPage(1); // Reset to first page when filters are applied
  };

  // Reset filters
  const resetFilters = () => {
    setFilter({
      releaseDate: null,
      ratingOrder: null,
      genre: null,
      system: null
    });
    setFilteredGames(games);
    setCurrentPage(1); // Reset to first page when filters are reset
  };

  return (
    <div>
        <br></br>
      {/* Filter bar */}
      <div className="filter-bar">
        {/* Release Date */}
        <label>Release Date:</label>
        <select value={filter.releaseDate} onChange={(e) => setFilter({ ...filter, releaseDate: e.target.value })}>
          <option value="">All</option>
          <option value="ascending">Ascending</option>
          <option value="descending">Descending</option>
          <option value="before1990">Before 1990</option>
          <option value="before2000">Before 2000</option>
          <option value="before2010">Before 2010</option>
          <option value="before2020">Before 2020</option>
        </select>
        {/* Rating Order */}
        <label>Rating:</label>
        <select value={filter.ratingOrder} onChange={(e) => setFilter({ ...filter, ratingOrder: e.target.value })}>
          <option value="">All</option>
          <option value="lowestToHighest">Lowest First</option>
          <option value="highestToLowest">Highest First</option>
        </select>
        {/* Genre */}
        <label>Genre:</label>
        <select value={filter.genre} onChange={(e) => setFilter({ ...filter, genre: e.target.value })}>
          <option value="">All</option>
          {/* Add options dynamically from data based on existing genres within data */}
          {Array.from(new Set(games.map(game => game.genre))).map((genre, index) => (
            <option key={index} value={genre}>{genre}</option>
          ))}
        </select>
        {/* System */}
        <label>System:</label>
        <select value={filter.system} onChange={(e) => setFilter({ ...filter, system: e.target.value })}>
          <option value="">All</option>
          {/* Add options dynamically from data based on existing systems within data*/}
          {Array.from(new Set(games.map(game => game.system))).map((system, index) => (
            <option key={index} value={system}>{system}</option>
          ))}
        </select>
        {/* Apply and reset buttons */}
        <button onClick={applyFilters}>Apply Filters</button>
        <button onClick={resetFilters}>Reset Filters</button>
      </div>
      {/* Game cards container */}
      <div className="game-cards-container">
        {currentGames.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
      {/* Pagination */}
      <div className="pagination">
        {currentPage > 1 && (
          <button onClick={() => paginate(currentPage - 1)}>Previous Page</button>
        )}
        {currentPage < Math.ceil(filteredGames.length / gamesPerPage) && (
          <button onClick={() => paginate(currentPage + 1)}>Next Page</button>
        )}
      </div>
    </div>
  );
}

export default Games;