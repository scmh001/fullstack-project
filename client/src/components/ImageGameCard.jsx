import React from 'react'; // Import React library for building components
import './ImageGameCard.css'; // Import specific styles for this component
import { Link } from 'react-router-dom'; // Import Link component for client-side routing

// Define the ImageGameCard functional component with 'game' object as a prop
const ImageGameCard = ({ game }) => {
    return (
        // Main container for the game card
        <div className="image-game-card">
            {/* Link wraps the image to make it clickable, navigating to the game's detail page */}
            <Link to={`/games/${game.id}`}>
                {/* Image of the game with alt text as the game's name for accessibility */}
                <img src={game.image} alt={game.game_name} />
            </Link>
            
            {/* Container for the game's name which should appear on hover (TODO item) */}
            <div className="name-box">
                {/* TODO: Uncomment and implement hover effect to display game name */}
                {/* <h2>{game.name}</h2> */}
            </div>
        </div>
    );
};

// Export the ImageGameCard component for use in other parts of the application
export default ImageGameCard;