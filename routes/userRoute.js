const express = require('express');
const user_route = express();
const session = require('express-session');
const auth = require('../auth/auth')

user_route.set('view engine', 'ejs');
user_route.set('views','./views/users')

user_route.use(express.urlencoded({extended:true}))

user_route.use(session({
    name:"user session",
    secret: 'user', // Replace with a strong secret key
    resave: false, // Don't save the session if unmodified
    saveUninitialized: false // Don't create a session until something is stored
  }));

const userController = require('../controllers/userController');

// home route
user_route.get('/', auth.checkLogout,userController.loadHome);
// signup route
user_route.get('/signup', userController.loadRegister);
user_route.post('/signup', userController.insertUser);

// login route
user_route.get('/login',auth.checkLogin, userController.loadLogin);
user_route.post('/login', userController.verifyUser);

// logout route to destroy session
user_route.get('/logout',userController.logout)

// update user route
user_route.get('/update', auth.checkLogout, userController.loadUpdateUser);
user_route.post('/update', auth.checkLogout, userController.updateUser)

module.exports = user_route
