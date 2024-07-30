//import/require all the needed modules
const path = require('path');
const express = require('express');

//initalize a constant to an instance of express
const app = express();
// const Router = require('./routes/route');
const PORT = 5000;

// //parse through all incoming data
// app.use(express.json())
// //look up what this does I forgot
// app.use(express.urlencoded({ extended: true }));

// app.use(express.static(path.resolve(__dirname, '../src')));


// app.use('/home', Router);

// //404 for any other routes
// app.use((req, res) => res.status(404).send('OOPSIE. There is no page here. Please go back.'));


// //global error handler
// app.use((err, req, res, next) => {
//     const defaultErr = {
//       log: 'Express error handler caught unknown middleware error',
//       status: 500,
//       message: { err: 'An error occurred' },
//     };
//     const errorObj = Object.assign({}, defaultErr, err);
//     console.log(errorObj.log);
//     return res.status(errorObj.status).json(errorObj.message);
//   });

  //listening in to port 5000
  app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
  });
  
  module.exports = app;