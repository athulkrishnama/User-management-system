const mongoose = require('mongoose');
const express = require('express');
const user_router = require('./routes/userRoute')
const app = express();

// connecting to database
mongoose.connect("mongodb://127.0.0.1:27017/adminDatabase");

app.use('/', user_router);

app.listen(3000, ()=>{
    console.log('Server Started')
})