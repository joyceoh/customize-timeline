import React from 'react';
//figure out how to do navlink
import { NavLink } from "react-router-dom";

export default function navBar() {
  return(
    <header>
      <nav className='navContainer'>
        <ul className='navList'>
            <li className='navItem left'><a href='/'><h1>Arcus</h1></a></li>
            <li className='navItem right loggedIn'><a href='/profile'>My Profile</a></li>
            <li className='navItem right loggedIn'><a href='/logout'>logout</a></li>
            {/* should be dynamic where if you don't have a login */}
        </ul>
      </nav>
    </header>
  )
}