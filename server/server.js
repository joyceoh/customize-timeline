//import/require all the needed modules
const path = require('path');
const express = require('express');

//initalize a constant to an instance of express
const app = express();
const Router = require('./routes/route');
const PORT = 6000;

//parse through all incoming data
app.use(express.json())
//look up what this does I forgot
app.use(express.urlencoded({ extended: true }));

// app.use(express.static(path.resolve(__dirname, '../src/index.html')));


app.use('/', Router);


  //listening in to port 5000
  app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
  });
  
  module.exports = app;