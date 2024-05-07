// import React from 'react';
// import './RecentlyReviewedGameCard.css'; 
// import { Link } from 'react-router-dom';

// const RecentlyReviewedGameCard = ({ game, user, handleDeleteReview }) => {
//     const topThreeComments = game.comments ? game.comments.slice(0, 3) : [];

//     const handleDelete = () => {
//         fetch(`http://localhost:8080/game-statistics/${game.id}/${user.id}`, {
//             method: 'PATCH',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ favorited: false }),
//         })
//         .then((res) => res.json())
//         .then((data) => {
//             handleDeleteReview(data.id);
//         })
//         .catch((error) => {
//             console.error('Error deleting game from favorites:', error);
//         });
//     };

//     return (
//         <div className="recently-reviewed-game-card">
//             {/* Delete button */}
//             <button className="delete-button" onClick={handleDelete}>❌</button>
//             <img src={game.image} alt={game.game_name} />
//             <Link to={`/games/${game.id}`}>
//                 <h2>{game.game_name}</h2>
//             </Link>
//             <p>Rating: {game.rating ? game.rating : 'N/A'} ⭐</p>
//             <p>Genre: {game.genre}</p>
//             {/* Display top 3 comments */}
//             {topThreeComments.map((comment, index) => (
//                 <p key={index}>Comments {index + 1}: {comment}</p>
//             ))}
//             {/* If less than 3 comments, display remaining slots */}
//             {game.comments && game.comments.length < 3 &&
//                 Array.from({ length: 3 - game.comments.length }).map((_, index) => (
//                     <p key={index + game.comments.length}>Comment {index + game.comments.length + 1}: N/A</p>
//                 ))
//             }
//         </div>
//     );
// };

// export default RecentlyReviewedGameCard;