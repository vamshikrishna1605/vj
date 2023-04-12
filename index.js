var mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/test");

const express = require('express');
const app = express();

const userRoute = require('./routes/userRoute');

app.use('/api',userRoute);

app.listen(3000, function(){
    console.log('Server is running');
});