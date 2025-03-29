const { Pool } = require('pg');
const env = require('dotenv');
env.config();

// Safely access the PG_URI environment variable
const PG_URI = process.env.PG_URI;

let pool;

// Only create the pool if we have a connection string
if (PG_URI) {
  pool = new Pool({
    connectionString: PG_URI
  });
  console.log('Database connection established');
} else {
  console.log('No PG_URI found. Using mock database.');
}

//should put in png of schema

module.exports = {
  query: (text, params, callback) => {
    if (!pool) {
      console.log('No database connection. Using mock data instead.');
      // Import and use mockDbConnect if no database connection
      const mockDb = require('./mockDbConnect');
      return mockDb.query(text, params, callback);
    }
    // console.log('executed query', text);
    return pool.query(text, params, callback);
  }
}
