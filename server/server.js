//import/require all the needed modules
const path = require('path');
const express = require('express');
const cors = require('cors'); 

//initalize a constant to an instance of express
const app = express();
const Router = require('./routes/route');
const PORT = 4000;

//parse through all incoming data
app.use(express.json())
//checks url
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// app.use(express.static(path.resolve(__dirname, '../src/index.html')));

app.get('/logout', (req, res) => res.status(200).sendFile(path.resolve(__dirname, '../src/logout.html')))

app.use('/', Router);




  //listening in to port 5000
  app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
  });
  
  module.exports = app;