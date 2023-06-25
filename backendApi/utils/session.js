const session = require('express-session');
const MongoStore = require('connect-mongo');
require('dotenv').config()


const oneDay = 1000 * 60 * 60 * 24;
const sessionMiddleware = session({
  secret: process.env.SECRET,
  saveUninitialized:true,
  cookie: { 
    maxAge: oneDay, 
    secure: true,
   },
  resave: false,
  store: MongoStore.create({
    mongoUrl: process.env.DATABASE_URL, // Replace with your MongoDB connection URI
    collectionName: 'sessions', // Collection name for storing sessions
  })
});

module.exports = sessionMiddleware;
