import React, { useState, useEffect } from 'react';

function MapLogic({ midpoint }) {
  const [places, setPlaces] = useState([]);
  const [medianDistance, setMedianDistance] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (midpoint) {
      suggestPlaces(midpoint.lat, midpoint.lng);
    }
  }, [midpoint]);

  const suggestPlaces = async (latitude, longitude) => {
    try {
      const response = await fetch(`/suggest-places?lat=${latitude}&lng=${longitude}`);
      const data = await response.json();
      setPlaces(data.places);
      setMedianDistance(data.median_distance);
      setError(null);
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to fetch nearby places');
    }
  };

  return (
    <div className="map-logic">
      <h2>Nearby Places Suggestion</h2>
      {error && <p className="error">{error}</p>}
      {medianDistance && <p>Median Distance: {medianDistance.toFixed(2)} meters</p>}
      <ul>
        {places.map((place, index) => (
          <li key={index}>
            <strong>{place.name}</strong> ({place.vicinity}) - Rating: {place.rating}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MapLogic;