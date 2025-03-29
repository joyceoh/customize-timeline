// Modified server.js for demo purposes
const path = require('path');
const express = require('express');
const cors = require('cors');
// Add dotenv to load environment variables
require('dotenv').config();

// Initialize an instance of express
const app = express();
const Router = require('./routes/route');
const PORT = 4000;

// Set a default NODE_ENV if not set
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
  console.log('NODE_ENV not set, defaulting to development mode');
}

console.log(`Server running in ${process.env.NODE_ENV} mode`);
console.log(`Database: ${process.env.PG_URI ? 'Using real database' : 'Using mock database'}`);

// Parse through all incoming data
app.use(express.json())
// Checks URL
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Serve static files from the dist directory
app.use(express.static(path.resolve(__dirname, '../dist')));

// Routes
app.get('/logout', (req, res) => res.status(200).sendFile(path.resolve(__dirname, '../src/logout.html')))

app.use('/', Router);

// Global 404 handler
app.use((req, res) => {
  console.log('404 Path not found:', req.path);
  res.status(404).send('OOPSIE. No page found. Please go back.');
});

// Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Demo server listening on port: ${PORT}`);
  console.log(`Open http://localhost:${PORT} in your browser to view the demo`);
});

module.exports = app;
