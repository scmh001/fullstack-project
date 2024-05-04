import './App.css';
import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from 'react';
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
  const [user, setUser] = useState(null)

  useEffect(() => {
    fetch('http://localhost:8080//authenticate-session')
    .then((res) => {
      if (res.ok){
        return res.json()
      }else{
        console.error('user not found')
      }
    })
    .then(data => setUser(data))
  }, [])

  const updateUser = (user) => {
    setUser(user)
  } 
  
  return (
    <>
      <div className="app">
      <NavBar user={user} updateUser={updateUser}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<Games />} />
        <Route path="/games/:id" element={<GameDetail user={user}/>} />
        <Route path="/favorites/" element={<Favorites user={user}/>} />
        <Route path="/wishlist" element={<WishList user={user}/>} />
        <Route path="/profile" element={<Profile user={user}/>} />
        <Route path="/groups" element={<Groups />} /> 
        <Route path="/signin" element={<SignIn updateUser={updateUser} user={user}/>} />
        </Routes>
      </div>
    </>
  );
}

export default App;