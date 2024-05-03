import React, { useState, useEffect } from 'react';
import ImageGameCard from '@/components/ImageGameCard.jsx';
import {Link} from 'react-router-dom';
import './Home.css';

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
        <div className='links-container'>
          <div className='link-card'>
            {//TODO make link to new page that populates based on highest review??
            }
            <Link to={'/games'}>
              <img src='https://t3.ftcdn.net/jpg/01/41/00/68/360_F_141006831_BQSBGCJprkqxltv5bui9LjdLnJ5jAQXC.jpg' alt='most-popular' />
            </Link>
          </div>
          <div className='link-card'>
            {//TODO make link to new page that populates based on most recently released??
            }
            <Link to={'/games'}>
              <img src='https://cdntest.bridge909.org/images/final-recentlyreleased-logo-1080square.png' alt='recently-released' />
            </Link>
          </div>
          <div className='link-card'>
            {//TODO make link to new page that populates based on if hasn't been released yet??
            }
            <Link to={'/games'}>
              <img src='https://img.freepik.com/free-vector/abstract-coming-soon-halftone-style-background-design_1017-27282.jpg?size=626&ext=jpg&ga=GA1.1.553209589.1714348800&semt=ais' alt='coming-soon' />
            </Link>
          </div>
        </div>
        <div className='reviews-container'>
            <h1 style={{ textAlign: 'center', fontFamily: "'Poppins', sans-serif" }}>Recent Reviews</h1>
            {//TODO make a reivew card and .map
            }
        </div>
        </>
      )}
    </div>
  );
}

export default Home;