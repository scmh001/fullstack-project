import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  const [topGames, setTopGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8080/top-games')
      .then(res => res.json())
      .then(data => {
        setTopGames(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Failed to fetch games:', error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='home-page'>
      <div className='banner'>
        <h1>Discover and Review Games</h1>
        <p>Track games you've played. Save those you want to play. Tell your friends what's good.</p>
      </div>
      <div className="links-container">
        {topGames.map(game => (
          <div className='link-card' key={game.id}>
            <Link to={`/games/${game.id}`}>
              <img src={game.image} alt={game.name} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;