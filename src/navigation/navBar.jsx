import React from 'react';
//figure out how to do navlink
import { NavLink } from "react-router-dom";

export default function navBar() {
  return(
    <header>
      <nav className='navContainer'>
        <ul>
            <li><a href='/'>Home</a></li>
            <h1>Arcus</h1>
            <li><a href='/myTimeline'>Edit Arcus</a></li>
            {/* should be dynamic where if you don't have a login */}
            <li><a href='/profile'>My Profile</a></li>
        </ul>
      </nav>
    </header>
  )
}