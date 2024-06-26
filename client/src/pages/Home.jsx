import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import ImageGameCard from '../components/ImageGameCard';
import HomeGameReviewCard from '../components/HomeGameReviewCard';



function Home() {
  const [topGames, setTopGames] = useState([]);
  const [recentReviews, setRecentReviews] = useState([]);



  useEffect(() => {
    //fetches top 5 games from back end
    fetch('http://localhost:8080/top-games')
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Something went wrong with your GET request');
        }
      })
      .then(data => {
        setTopGames(data); //sets state for games from backend 
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
        setRecentReviews(data); // sets state of reviews gotten from backend 
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
        <p>Track games you've played. Save games you want to play. Share your opinions. </p>
      </div>
      <div className='top-games'>
        <h2 >TOP GAMES</h2>
        </div>
      <div className="image-game-cards-container">
        {/* iterates over top games and creates game image card for each */}
        {topGames.map(game => (
          <ImageGameCard key={game.id} game={game} />
        ))}
      </div>
      <div className='links-container'>
        <div className='link-card'>
          <Link to={'/mostpopular'}>
            <img src='https://i.imgur.com/Zc9EmpV.jpeg' alt='most-popular' />
          </Link>
        </div>
        <div className='link-card'>
          <Link to={'/recentlyreleased'}>
            <img src='https://i.imgur.com/EowlAak.jpg' alt='recently-released' />
          </Link>
        </div>
      </div>
      <div className='recent-reviews-container'>
        <h2 className='recent-reviews'>RECENT REVIEWS</h2>
      </div>
      <div className="game-card-container">
        {/* iterates over reviews and creates review cards for each */}
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



