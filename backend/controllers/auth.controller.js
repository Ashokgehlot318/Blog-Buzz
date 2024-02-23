const { User } = require("../models/user.model");
const bcryptjs = require('bcryptjs');

exports.signup =async (req,res) =>{
    // console.log(req.body);
    // res.json("signup is done")

    const {username, email, password} = req.body;

    if(!username || !email || !password || username =="" || email == "" || password == ""){
        return res.status(400).json({message: "All fields are required..."});
    }

    const hashedPassword = bcryptjs.hashSync(password,10);

    const newUser = new User({
        username, 
        email, 
        password: hashedPassword
    });

    try{
        await newUser.save();
        res.json("SignUp successfully...")
    }
    catch(error){
        res.status(500).json({message: error.message});
    }

}