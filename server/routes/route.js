const express = require('express');
const router = express.Router();
const path = require('path');


//require for the different controllers
const comments = require('../controllers/commentController.js');
const Arcus = require('../controllers/arcusController.js');

// console.log('dirname: ', __dirname)

router.get('/',
    (req, res) => res.status(200).sendFile(path.resolve(__dirname, '../../src/index.html').json())
);

router.post('/',
    Arcus.getChartData,
    (req, res) => res.status(200).json(res.locals.data)
)


router.post('/editArcus',
    (req, res) => res.status(200).json()
);

router.get('/comments',
    (req, res) => res.status(200).json()
);

router.post('/comments',
    (req, res) => res.status(200).json()
);


//404 for any other routes
router.use((req, res) => res.status(404).send('OOPSIE. There is no page here. Please go back.'));

//global error handler
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