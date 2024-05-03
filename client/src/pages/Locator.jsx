import React, { useState } from 'react';
import MapLogic from "../components/MapLogic";

const Locator = () => {
  const [addresses, setAddresses] = useState([]);
  const [midpoint, setMidpoint] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const [lat1, lng1, lat2, lng2] = e.target.elements;
    const address1 = `${lat1.value}, ${lng1.value}`;
    const address2 = `${lat2.value}, ${lng2.value}`;

    const sortedAddresses = [address1, address2].sort();
    setAddresses(sortedAddresses);

    // Calculate midpoint
    const midLat = (parseFloat(lat1.value) + parseFloat(lat2.value)) / 2;
    const midLng = (parseFloat(lng1.value) + parseFloat(lng2.value)) / 2;
    
    setMidpoint({ lat: midLat, lng: midLng });
    setError(null);
  };

  return (
    <div>
      <h1>Midpoint Calculator</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Latitude 1:</label>
          <input type="text" name="lat1" />
        </div>
        <div>
          <label>Longitude 1:</label>
          <input type="text" name="lng1" />
        </div>
        <div>
          <label>Latitude 2:</label>
          <input type="text" name="lat2" />
        </div>
        <div>
          <label>Longitude 2:</label>
          <input type="text" name="lng2" />
        </div>
        <button type="submit">Calculate Midpoint</button>
      </form>
      {addresses.length > 0 && (
        <div>
          <h2>Sorted Addresses:</h2>
          <ul>
            {addresses.map((address, index) => (
              <li key={index}>{address}</li>
            ))}
          </ul>
        </div>
      )}
      {midpoint && (
        <div>
          <h2>Midpoint:</h2>
          <p>Latitude: {midpoint.lat}</p>
          <p>Longitude: {midpoint.lng}</p>
          <MapLogic midpoint={midpoint} />
        </div>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Locator;