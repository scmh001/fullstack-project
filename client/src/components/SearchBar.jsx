import React, { useState, useEffect } from 'react';
import './SearchBar.css';
import { Link } from 'react-router-dom';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchSuggestions = () => {
      if (searchQuery.trim() !== '') {
        fetch(`http://localhost:8080/search?q=${searchQuery}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              console.error('Error fetching suggestions');
            }
          })
          .then((data) => {
            setSuggestions(data);
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      } else {
        setSuggestions([]);
      }
    };
    fetchSuggestions();
  }, [searchQuery]);

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="search-container">
      <input type="text" value={searchQuery} onChange={handleInputChange} placeholder="Search" />
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((game) => (
            <li key={game.id}>
               <Link to={`/games/${game.id}`}>
                {game.game_name}
                </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;