const express = require('express');
const user_route = express();
const session = require('express-session')

user_route.set('view engine', 'ejs');
user_route.set('views','./views/users')

user_route.use(express.urlencoded({extended:true}))

user_route.use(session({
    secret: 'your-secret-key', // Replace with a strong secret key
    resave: false, // Don't save the session if unmodified
    saveUninitialized: false // Don't create a session until something is stored
  }));

const userController = require('../controllers/userController');

user_route.get('/signup', userController.loadRegister);
user_route.post('/signup', userController.insertUser);

module.exports = user_route
