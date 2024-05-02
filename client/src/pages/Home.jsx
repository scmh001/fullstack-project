import React, { useState, useEffect } from 'react';
import GameCard from '@/components/GameCard.jsx';




function Home() {
  return (
    <div>
      <h1>Game Cards</h1>
      <div className="game-cards-container">

          <GameCard />
          
      </div>
    </div>
  );
}

export default Home;