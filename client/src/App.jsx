<<<<<<< HEAD
import './App.css';
import { Route, Routes } from "react-router-dom";
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import Groups from './pages/Groups';
import Games from './pages/Games'
import GameDetail from './pages/GameDetail'
import WishList from './pages/WishList'
import SignIn from './pages/SignIn';

function App() {
  return (
    <>
      <div className="app">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<Games />} />
        <Route path="/games/:id" element={<GameDetail />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/signin" element={<SignIn />} />
        </Routes>
      </div>
    </>
  );
}
=======
import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [midpoint, setMidpoint] = useState(null);
  const [restaurants, setRestaurants] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post('http://localhost:8080/api/midpoint', {
      address1,
      address2,
    });
    if (response.data.midpoint) {
      setMidpoint(response.data.midpoint);
      setRestaurants(response.data.restaurants);
    } else {
      alert('Invalid addresses. Please try again.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Address 1"
          value={address1}
          onChange={(e) => setAddress1(e.target.value)}
        />
        <input
          type="text"
          placeholder="Address 2"
          value={address2}
          onChange={(e) => setAddress2(e.target.value)}
        />
        <button type="submit">Find Midpoint</button>
      </form>
      {midpoint && (
        <div>
          <h2>Midpoint:</h2>
          <p>Latitude: {midpoint[0]}</p>
          <p>Longitude: {midpoint[1]}</p>
        </div>
      )}
      {restaurants.length > 0 && (
        <div>
          <h2>Nearby Restaurants:</h2>
          <ul>
            {restaurants.map((restaurant) => (
              <li key={restaurant.place_id}>{restaurant.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
>>>>>>> shukri

export default App;