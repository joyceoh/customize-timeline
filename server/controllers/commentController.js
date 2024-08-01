//initalize an empty object to server the middleware functions
const { query } = require('express');
const db = require('../models/dbConnect');


const commentController = {};

commentController.getComments = (req, res, next) => {
    const queryString = {
        text: 'SELECT arcususer.ign, comments.created_at, comments.text_body FROM arcususer INNER JOIN comments ON arcususer._id = comments.user_id'
    }
    db.query(queryString)
    .then(data => {
        res.locals.commentsData = data.rows;
        console.log(data.rows)
        return next();
    })
}

module.exports = commentController