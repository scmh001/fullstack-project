// Import necessary styles and components
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
import MostPopular from './pages/MostPopular'
import RecentlyReleased from './pages/RecentlyReleased';

function App() {
  // State hook to manage user state
  const [user, setUser] = useState(null)

  // Effect hook to fetch user data on component mount
  useEffect(() => {
    fetch('http://localhost:8080//authenticate-session')
    .then((res) => {
      if (res.ok){
        return res.json() // Parse JSON data if response is OK
      }else{
        console.error('user not found') // Log error if user not found
      }
    })
    .then(data => setUser(data)) // Update user state with fetched data
  }, [])

  // Function to update user state
  const updateUser = (user) => {
    setUser(user)
  } 
  
  return (
    <>
      <div className="app">
        {/* NavBar component that receives user state and updateUser function */}
        <NavBar user={user} updateUser={updateUser}/>
        {/* Router setup with routes for different pages */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<Games />} />
          <Route path="/games/:id" element={<GameDetail user={user}/>} />
          <Route path="/favorites/" element={<Favorites user={user}/>} />
          <Route path="/wishlist" element={<WishList user={user}/>} />
          <Route path="/mostpopular" element={<MostPopular user={user}/>} />
          <Route path="/recentlyreleased" element={<RecentlyReleased user={user}/>} />
          <Route path="/profile" element={<Profile user={user}/>} />
          <Route path="/groups" element={<Groups />} /> 
          <Route path="/signin" element={<SignIn updateUser={updateUser} user={user}/>} />
        </Routes>
      </div>
    </>
  );
}

export default App;