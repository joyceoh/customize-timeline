import React from 'react';
//figure out how to do navlink
import { NavLink } from "react-router-dom";

export default function navBar() {
  return(
    <header>
      <nav className='navContainer'>
        <ul>
            <li><a href='/'>Home</a></li>
            <h1>my timeline</h1>
            <li><a href='/myTimeline'>Edit Timeline</a></li>
            <li><a href='/profile'>My Profile</a></li>
        </ul>
      </nav>
    </header>
  )
}