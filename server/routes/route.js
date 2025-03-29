const express = require('express');
const router = express.Router();
const path = require('path');

// Require controllers
// Import controllers for the demo
const Comments = require('../controllers/commentController.js');
const Arcus = require('../controllers/arcusController.js');

// Serve the main page
router.get('/',
    (req, res) => res.status(200).sendFile(path.resolve(__dirname, '../../dist/index.html'))
);

// Get Arcus timeline data
router.post('/', 
    Arcus.getChartData,
    Arcus.sortDate, 
    (req, res) => {
    console.log('Sending chart data:', res.locals.arcusData);
    res.status(200).json(res.locals.arcusData);
  });

// Edit Arcus (currently a stub)
router.post('/editArcus',
    (req, res) => res.status(200).json({ message: 'Edit feature would be implemented here' })
);

// Get comments
router.get('/comments',
    Comments.getComments,
    (req, res) => res.status(200).json(res.locals.commentsData)
);

// Add a comment
router.post('/comments',
    Comments.addComment,
    (req, res) => {
      res.status(200).json({ success: true, message: 'Comment added successfully' });
    }
);

// 404 for any other routes
router.use((req, res) => res.status(404).send('OOPSIE. No page found. Please go back.'));

// Global error handler
router.use((err, req, res, next) => {
    const defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 500,
      message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
  });

module.exports = router;
