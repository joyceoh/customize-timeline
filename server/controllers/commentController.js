//initalize an empty object to server the middleware functions
const { query } = require('express');
const db = require('../models/dbConnect');


const commentController = {};

commentController.getComments = (req, res, next) => {
    const queryString = {
        text: 'SELECT arcususer.ign, comments.created_at, comments.text_body, comments.id FROM arcususer INNER JOIN comments ON arcususer._id = comments.user_id ORDER BY created_at DESC'
    }
    db.query(queryString)
    .then(data => {
        res.locals.commentsData = data.rows;
        return next();
    })
}

commentController.addComment = async (req, res, next) => {
    console.log('we are in middleware', req.body.user)
    const queryString = {
        text: `INSERT INTO comments (text_body, user_id) VALUES ($1, $2)`,
        values: [req.body.text, '3329433b-0ad2-46b9-b2a9-443c24e63d2b']
    }
    db.query(queryString)
    .then(data => {
      if(data.error) {
        return next(error)
      }
      res.locals.success = 'message added' 
      next()   
    })

}

module.exports = commentController