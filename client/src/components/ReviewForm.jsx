import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

// ReviewForm component definition
function ReviewForm({ gameId, userId, userName, updateGameStats }) {
  // Initial values for the form fields
  const initialValues = {
    rating: '',
    comments: ''
  };

  // State to store the game statistics ID
  const [gameStatId, setGameStatId] = useState(null);

  // useEffect hook to fetch game statistics when gameId or userId changes
  useEffect(() => {
    // API call to fetch game statistics for the current user and game
    fetch(`http://localhost:8080/game-statistics/${gameId}/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        // Update state with the fetched game statistics ID, or null if not found
        if (data.game_stats_id) {
          setGameStatId(data.game_stats_id);
        } else {
          setGameStatId(null);
        }
      });
  }, [gameId, userId]); // Dependencies array for useEffect

  // Function to handle form submission
  const handleSubmit = (values, { resetForm }) => {
    // Prepare review data to be sent to the server
    const reviewData = {
      game_id: gameId,
      user_id: userId,
      ...values
    };

    // Check if game statistics already exist
    if (gameStatId !== null) {
      // If they exist, update the existing statistics
      fetch(`http://localhost:8080/game-statistics/${gameId}/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      })
        .then((res) => res.json())
        .then((data) => {
          setGameStatId(data.game_stats_id);
          updateGameStats(); // Update game stats in the parent component
        });
    } else {
      // If no statistics exist, create new statistics
      fetch(`http://localhost:8080/game-statistics`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      })
        .then((res) => res.json())
        .then((data) => {
          setGameStatId(data.game_stats_id);
          updateGameStats(); // Update game stats in the parent component
        });
    }
    resetForm(); // Reset form fields after submission
  };

  // Function to validate form inputs
  const validate = (values) => {
    const errors = {};
    if (!values.rating) {
      errors.rating = 'Please select a rating';
    }
    if (!values.comments) {
      errors.comments = 'Please enter a comment';
    }
    return errors;
  };

  // Render the form using Formik
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validate={validate}
    >
      {({ isSubmitting }) => (
        <Form>
          <div>
            <label htmlFor="rating">Rating:</label>
            <Field
              type="number"
              id="rating"
              name="rating"
              min="1"
              max="5"
              required
            />
            <ErrorMessage name="rating" component="div" className="error" />
          </div>
          <div>
            <label htmlFor="comments">Comments:</label>
            <Field
              as="textarea"
              id="comments"
              name="comments"
              required
            />
            <ErrorMessage name="comments" component="div" className="error" />
          </div>
          <button type="submit" disabled={isSubmitting}>
            Submit Review
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default ReviewForm;