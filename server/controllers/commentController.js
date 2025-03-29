//initalize an empty object to server the middleware functions
const db = require('../models/mockDbConnect');

// Mock comment controller that doesn't require database connection

// Sample comment data
const mockComments = [
  {
    id: 1,
    ign: "BraveSurvivor",
    created_at: "2023-04-21 10:30:00",
    text_body: "Just started my journey. Any tips for managing side effects from the first chemo session?"
  },
  {
    id: 2,
    ign: "HopeWarrior",
    created_at: "2023-04-21 11:15:00",
    text_body: "Stay hydrated and rest when your body tells you to! The fatigue can be overwhelming at first, but it gets more manageable as you adapt."
  },
  {
    id: 3,
    ign: "JourneyStrong",
    created_at: "2023-04-21 14:22:00",
    text_body: "I found that keeping a symptom journal helped me communicate better with my care team. Good luck with your treatment!"
  },
  {
    id: 4,
    ign: "BraveSurvivor",
    created_at: "2024-01-16 09:45:00",
    text_body: "Reached my one-year milestone! It was a tough journey, but seeing it all laid out on my Arcus timeline makes me realize how far I've come."
  },
  {
    id: 5,
    ign: "HopeWarrior",
    created_at: "2024-01-16 11:30:00",
    text_body: "Congratulations on your milestone! What an amazing journey - thanks for sharing it on Arcus."
  },
  {
    id: 6,
    ign: "BraveSurvivor",
    created_at: "2023-10-20 15:10:00",
    text_body: "The radiation therapy was challenging, but having support from this community made all the difference."
  },
  {
    id: 7,
    ign: "BraveSurvivor",
    created_at: "2024-02-15 16:45:00",
    text_body: "Does anyone have advice for preparing for the six-month checkup? Feeling anxious about it."
  },
  {
    id: 8,
    ign: "JourneyStrong",
    created_at: "2024-02-16 08:30:00",
    text_body: "I bring a list of questions and a support person with me. It helps manage the scan anxiety. You've got this!"
  }
];

const commentController = {};

// Get all comments
commentController.getComments = (req, res, next) => {
  console.log("Fetching comments");
  
  // For mock DB, return static data
  if (process.env.NODE_ENV === 'development' || !process.env.PG_URI) {
    res.locals.commentsData = mockComments;
    return next();
  }
  
  // For real DB
  const queryString = {
    text: 'SELECT arcususer.ign, comments.created_at, comments.text_body, comments.id FROM arcususer INNER JOIN comments ON arcususer._id = comments.user_id ORDER BY created_at DESC'
  };
  
  db.query(queryString)
    .then(data => {
      res.locals.commentsData = data.rows;
      return next();
    })
    .catch(err => {
      return next(err);
    });
};

// Add a new comment
commentController.addComment = async (req, res, next) => {
  console.log('Adding new comment', req.body);
  
  // For mock DB
  if (process.env.NODE_ENV === 'development' || !process.env.PG_URI) {
    // Create a new comment object
    const newComment = {
      id: mockComments.length + 1,
      ign: "BraveSurvivor", // Default to the main user
      created_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
      text_body: req.body.text
    };
    
    // Add to our mock comments array
    mockComments.unshift(newComment);
    
    res.locals.success = 'message added';
    return next();
  }
  
  // For real DB
  console.log('we are in middleware', req.body.user);
  const queryString = {
    text: `INSERT INTO comments (text_body, user_id) VALUES ($1, $2)`,
    values: [req.body.text, '3329433b-0ad2-46b9-b2a9-443c24e63d2b']
  };
  
  db.query(queryString)
    .then(data => {
      if(data.error) {
        return next(data.error);
      }
      res.locals.success = 'message added';
      next();
    })
    .catch(err => {
      return next(err);
    });
};

module.exports = commentController;
