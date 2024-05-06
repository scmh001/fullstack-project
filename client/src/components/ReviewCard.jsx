// import React, { useState, useEffect } from 'react';
// import './ReviewCard.css';
// import { Link } from 'react-router-dom';

// function RecentReviews() {
//   const [recentReviews, setRecentReviews] = useState([]);

//   useEffect(() => {
//     fetch('http://localhost:8080/recent-reviews')
//       .then((res) => {
//         if (res.ok) {
//           return res.json();
//         } else {
//           throw new Error('Failed to fetch recent reviews');
//         }
//       })
//       .then((data) => {
//         setRecentReviews(data);
//       })
//       .catch((error) => {
//         console.error('Error fetching recent reviews:', error);
//       });
//   }, []);

//   return (
//     <div className="recent-reviews-container">
//       <h2>Recent Reviews</h2>
//       {recentReviews.length > 0 ? (
//         recentReviews.map((review) => (
//           <ReviewCard key={review.id} review={review} />
//         ))
//       ) : (
//         <p>No recent reviews found.</p>
//       )}
//     </div>
//   );
// }

// export default RecentReviews;





// import React from 'react';

// function ReviewCard({ review }) {
//   return (
//     <div className="review-card">
//       <h3>{review.game_name}</h3>
//       <p>User: {review.username}</p>
//       <p>Rating: {review.rating}</p>
//       <p>Comments: {review.comments}</p>
//     </div>
//   );
// }

// export default ReviewCard;