import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import ImageGameCard from '../components/ImageGameCard';
import HomeGameReviewCard from '../components/HomeGameReviewCard';



function Home() {
  const [topGames, setTopGames] = useState([]);
  const [recentReviews, setRecentReviews] = useState([]);



  useEffect(() => {
    fetch('http://localhost:8080/top-games')
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Something went wrong with your GET request');
        }
      })
      .then(data => {
        setTopGames(data);
      })
      .catch(error => {
        console.error('Failed to fetch games:', error);
      });

    // Fetch recent reviews
    fetch('http://localhost:8080/recent_reviews')
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Something went wrong with your GET request');
        }
      })
      .then(data => {
        console.log('Fetched recent reviews data:', data);
        setRecentReviews(data);
      })
      .catch(error => {
        console.error('Failed to fetch recent reviews:', error);
      });
  }, []);

  if (!topGames || !recentReviews) {
    return <div>Loading...</div>;
  }


  return (
    <div className='home-page'>
      <div className='banner'>
        <h1>Discover and Review Games</h1>
        <p>Track games you've played. Save those you want to play. Tell your friends what's good.</p>
      </div>
      <div className="image-game-cards-container">
        {topGames.map(game => (
          <ImageGameCard key={game.id} game={game} />
        ))}
      </div>
      <div className='links-container'>
        <div className='link-card'>
          {//TODO make link to new page that populates based on highest review??
          }
          <Link to={'/mostpopular'}>
            <img src='https://i.imgur.com/Zc9EmpV.jpeg' alt='most-popular' />
          </Link>
        </div>
        <div className='link-card'>
          {//TODO make link to new page that populates based on most recently released??
          }
          <Link to={'/recentlyreleased'}>
            <img src='https://i.imgur.com/EowlAak.jpeg' alt='recently-released' />
          </Link>
        </div>
        <div className='link-card'>
          {//TODO make link to new page that populates based on if hasn't been released yet??
          }
          <Link to={'/games'}>
            <img src='https://i.imgur.com/cYIKKKu.jpeg' alt='coming-soon' />
          </Link>
        </div>
      </div>
      <div className="game-card-container">
        {recentReviews.map(review => (
          <div key={review.game_stats_id} className="game-card">
            <HomeGameReviewCard gameStats={review} />
      </div>
    ))}
  </div>
</div>
  );
          }
export default Home;



