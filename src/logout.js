import React from 'react';
// import { Switch, Route } from 'react-router';

// import the timeline and dynamic info/comment section
import NavBar from './navigation/navBar.jsx';

//import style sheet

const Logout = () => {
  return(
    <section className='logout'>
      <h1>You have successfully logged out.</h1>
      <h5>Would you like to log back in?</h5>
      <form action='submit'>
        <label>Username: </label> <input></input>
        <label>Password: </label> <input type='password'></input>
        <button type='submit'>Login</button>
      </form>
    </section>
  )
}

export default Logout;