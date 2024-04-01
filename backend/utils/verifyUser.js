const jwt = require('jsonwebtoken');
const errorHandler = require('./error');
require('dotenv').config();

exports.verifyUser = async (req,res,next) =>{
    const token = req.cookies.access_token;
    if(!token){
         next(errorHandler(401,"Unauthorized"));
        // console.log("error")
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) =>{
        if(err){
             next(errorHandler(401, 'Unauthorized'));
            console.log(err);
        }

        req.user = user;
        next();
    });
}