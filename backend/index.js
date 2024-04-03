const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
dotenv.config();

//middleware - parse the json data
app.use(express.json());
app.use(cookieParser());

// Middleware for handling errors
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  });

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
    });


const userRouter = require("./routes/user.route");
const authRouter = require("./routes/auth.route");
const blogPost = require("./routes/blog-post.route");

app.use("/api/user",userRouter);
app.use("/api/auth",authRouter);
app.use("/api/post",blogPost);