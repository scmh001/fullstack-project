// GameDetail.jsx
import React from 'react';
import { useParams } from 'react-router-dom';

function GameDetail() {
  const { id } = useParams(); // Retrieve the game ID from the URL parameter

  // Fetch game details based on the ID and display them

  return (
    <div>
      <h1>Game Detail</h1>
      <p>Game ID: {id}</p>
      {/* Display other details of the game */}
    </div>
  );
}

export default GameDetail;