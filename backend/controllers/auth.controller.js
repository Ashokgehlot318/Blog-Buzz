const { User } = require("../models/user.model");
const bcryptjs = require('bcryptjs');
const { errorHandler } = require("../utils/error");

const jwt = require('jsonwebtoken');

exports.signup =async (req,res,next) =>{
    // console.log(req.body);
    // res.json("signup is done")

    const {username, email, password} = req.body;

    if(!username || !email || !password || username =="" || email == "" || password == ""){
        // return res.status(400).json({message: "All fields are required..."});
        next(errorHandler(400, 'all fields are required...'));
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
        // next(error);
    }

}


exports.signin = async (req,res,next) =>{
    const { email, password } = req.body;

    if(!email || !password){
        return next(errorHandler(404,"All fields are required"));
    }

        try{
            const validUser =await User.findOne({ email });
            if(!validUser){
                return next(errorHandler(404,"User not found"));
            }

            const validPassword = bcryptjs.compareSync(password,validUser.password);
            if(!validPassword){
               return next(errorHandler(404,'Invalid password'));
            }

            const token = jwt.sign({id: validUser._id,},process.env.JWT_SECRET,{ expiresIn:'12h' });

            // first method
            validUser.password = undefined;

            // // second method 
            // const {password:password, ...rest} = validUser._doc;

            res.status(200)
                .cookie('access_token', token, {
                    httpOnly: true,
                })
                .json(validUser);
        }
        catch(error){
            next(error);
        }
};

exports.google = async (req,res,next) =>{
    const {email, name, googlePhotoUrl} = req.body;

    try{
        // if user exists
        const user = await User.findOne({email});
        if(user){
            const token = await jwt.sign({id: user._id}, process.env.JWT_SECRET);
            const {password, ...rest} = user._doc;
            res.status(200).cookie('access_token', token, {
                httpOnly: true,
            }).json(rest);
        }
        else{
            const generatedPassword = Math.random().toString(36).slice(-10) + Math.random().toString(36).slice(-10);

            const hashedPassword = await bcryptjs.hashSync(generatedPassword,10);

            const newUser = new User({
                username: name.toLowerCase().split(" ").join("") + Math.random().toString(9).slice(-4), // for unique name
                email,
                password: hashedPassword,
                profilePicture: googlePhotoUrl,
            });

            newUser.save();
            const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET);
            const {password, ...rest} = newUser._doc;
            res.status(200)
                .cookie('access_token', token,{
                    httpOnly: true,
                })
                .json(rest);
        }

    }
    catch(error){
        next(error);
    }

}
