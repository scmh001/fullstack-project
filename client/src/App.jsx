import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { Route, Routes } from "react-router-dom"
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import Groups from './pages/Groups';

function App() {


  return (
    <>
      <div className="app">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/groups" element={<Groups />} />
      </Routes>
      </div>
      </>
  )
}

export default App
