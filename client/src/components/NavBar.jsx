import React, {useState} from 'react';
import { NavLink, Link } from 'react-router-dom';
import "./NavBar.css";

function NavBar() {


  return (
    <>
    <div className="nav-bar">
        <nav>
            <Link to="/" className="title">Rendezvouz</Link>
            <ul>
                <li>
                    <NavLink to="/favorites">Favorites</NavLink>
                </li>
                <li>
                    <NavLink to="/groups">Groups</NavLink>
                </li>
                <li>
                    <NavLink to="/profile">Profile</NavLink>
                </li>
            </ul>
        </nav>
    </div>
    </>
  )
}

export default NavBar