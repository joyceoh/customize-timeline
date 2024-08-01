import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";
import './style/App.scss';

createRoot(document.getElementById('app')).render(<Router><App /></Router>);

// depricated
// import React from "react";
// import ReactDOM from "react-dom";
// import App from "./App";
// import "./App.scss";

// const el = document.getElementById("app");

// ReactDOM.render(<App />, el);