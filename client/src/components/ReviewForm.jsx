import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
// import moment from 'moment';


function ReviewForm({ gameId, userId, userName }) {
  const initialValues = {
    rating: '',
    comments: ''
  };
  const [gameStatId, setGameStatId] = useState(null)

  useEffect(() => {
    // Fetch game statistics for the current user and game
    fetch(`http://localhost:8080/game-statistics/${gameId}/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        // If game statistics exist, update state with the fetched data
        if (data.game_stats_id) {
          setGameStatId(data.game_stats_id);
        } else {
          // If no game statistics exist, set default state
          setGameStatId(null);
        }
      });
  }, [gameId, userId]); // Dependencies array for useEffect

  const handleSubmit = (values, { resetForm }) => {
    const reviewData = {
      gameId: gameId,
      userId: userId,
      username: userName,
      // datePosted: moment().format('YYYY-MM-DD'),
      ...values
    };
    if (gameStatId !== null) {
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
          })
      } else {
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
          });
      };
    resetForm();
  };

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
