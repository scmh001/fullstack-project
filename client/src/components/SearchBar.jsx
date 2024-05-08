import React, { useState, useEffect } from 'react';
import './SearchBar.css';
import { Link } from 'react-router-dom';

// SearchBar component definition
const SearchBar = () => {
  // State hooks for search query and suggestions
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  // useEffect hook to fetch suggestions based on the search query
  useEffect(() => {
    // Function to fetch suggestions from a server
    const fetchSuggestions = () => {
      // Only fetch suggestions if the search query is not empty
      if (searchQuery.trim() !== '') {
        fetch(`http://localhost:8080/search?q=${searchQuery}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((response) => {
            // Check if the response is successful
            if (response.ok) {
              return response.json();
            } else {
              console.error('Error fetching suggestions');
            }
          })
          .then((data) => {
            // Update the suggestions state with the fetched data
            setSuggestions(data);
          })
          .catch((error) => {
            // Log any errors to the console
            console.error('Error:', error);
          });
      } else {
        // Clear suggestions if the search query is empty
        setSuggestions([]);
      }
    };
    // Call the fetchSuggestions function
    fetchSuggestions();
  }, [searchQuery]); // Dependency array to re-run the effect when searchQuery changes

  // Handler for changes in the input field
  const handleInputChange = (event) => {
    // Update the searchQuery state with the new input value
    setSearchQuery(event.target.value);
  };

  // Render the search bar and suggestions list
  return (
    <div className="search-container">
      <input
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        placeholder="Search"
      />
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

// Export the SearchBar component
export default SearchBar;