import React, { useState } from 'react';
import './App.css';

function MapLogic() {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [places, setPlaces] = useState([]);
  const [medianDistance, setMedianDistance] = useState(null);
  const [error, setError] = useState(null);

  const suggestPlaces = async () => {
    if (!latitude || !longitude) {
      setError('Latitude and longitude are required');
      return;
    }

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
      <h1>Nearby Places Suggestion</h1>
      <div>
        <label htmlFor="latitude">Latitude:</label>
        <input type="text" id="latitude" value={latitude} onChange={(e) => setLatitude(e.target.value)} placeholder="Latitude" />
      </div>
      <div>
        <label htmlFor="longitude">Longitude:</label>
        <input type="text" id="longitude" value={longitude} onChange={(e) => setLongitude(e.target.value)} placeholder="Longitude" />
      </div>
      <button onClick={suggestPlaces}>Find Nearby Places</button>
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

export default App;