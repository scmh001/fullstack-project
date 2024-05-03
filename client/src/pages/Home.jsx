import React, { useState, useEffect } from 'react';
import ImageGameCard from '@/components/ImageGameCard.jsx';

function Home() {
  const [topGames, setTopGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8080/top-games')
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          setIsLoading(false);
          return console.error('Something went wrong with your GET request.');
        }
      })
      .then(gameData => {
        console.log(gameData);
        setTopGames(gameData);
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
        console.error(error);
      });
  }, []);

  return (
    <div className='home-page'>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
        <h1 style={{ textAlign: 'center', fontFamily: "'Poppins', sans-serif" }}>Top Games</h1>
        <div className="image-game-cards-container">
          {topGames.map((game) => (
            <ImageGameCard key={game.id} game={game} />
          ))}
        </div>
        </>
      )}
    </div>
  );
}

export default Home;