import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

import { Route, Routes } from "react-router-dom";
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import Groups from './pages/Groups';
import SignIn from './pages/SignIn'
import Games from './pages/Games'
import GameDetail from './pages/GameDetail'
import WishList from './pages/WishList'
import SignIn from './pages/SignIn';
import Games from './pages/Games';
import GameDetail from './pages/GameDetail';
import Login from './pages/Login';  // Import Login component
import Signup from './pages/Signup';  // Import Signup component

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
        <Route path="/login" element={<Login />} /> 
        <Route path="/signup" element={<Signup />} />  
        </Routes>
      </div>
    </>
  );
}

export default App;