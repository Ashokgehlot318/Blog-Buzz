const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

Port = 4000;

app.listen(Port, () => {
    console.log(`server is created at port no. ${Port}`)
});

mongoose.connect(process.env.DB_URL)
    .then( ()=>{
        console.log("MongoDB is connected successfully..");
    })
    .catch(error => {
        console.log("mongoDB is facing issue...");
        console.log(error);
    })