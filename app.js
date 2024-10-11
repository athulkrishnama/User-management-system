const mongoose = require('mongoose');
const express = require('express');
const user_router = require('./routes/userRoute');
const admin_router = require('./routes/adminRoute');
const nocache = require('nocache');

const app = express();

app.use(nocache())
// connecting to database
mongoose.connect("mongodb://127.0.0.1:27017/adminDatabase");

app.use('/', user_router);
app.use('/admin', admin_router);

app.listen(3000, ()=>{
    console.log('Server Started')
})