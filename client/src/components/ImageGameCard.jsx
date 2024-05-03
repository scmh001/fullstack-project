import React, { useState } from 'react';
import './ImageGameCard.css';
import { Link } from 'react-router-dom';

const ImageGameCard = ({ game }) => {
    return (
      <div className="image-game-card">
       <Link to={`/games/${game.id}`}>
         <img src={game.image} alt={game.name} />
        </Link>
       
        <div className="name-box">
            {/* //TODO make name appear on hover */}
            {/* <h2>{game.name}</h2> */}
        </div>
      </div>
    );
  };

export default ImageGameCard;