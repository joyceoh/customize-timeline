import React from 'react';
import { createRoot } from 'react-dom/client';
import Logout from './logout';
import { BrowserRouter as Router } from "react-router-dom";
import './style/styles.css';

createRoot(document.getElementById('logout')).render(<Router><Logout/></Router>);