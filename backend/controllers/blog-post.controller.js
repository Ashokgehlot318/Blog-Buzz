const  Post  = require("../models/blog-post.model");

exports.create = async (req,res,next) =>{
    if(!req.user.isAdmin){
        // return errorHandler(403, 'you are not allowed to create post');
        return res.status(403).json("you are not allowed to create post");
    }

    if(!req.body.title || !req.body.content){
        return res.status(400).json("all fields are required...");
    }


    const slug = req.body.title
        .split(' ')
        .join('-')
        .toLowerCase()
        .replace(/[^a-zA-Z0-9-]/g, '');
    const newPost = new Post({
        ...req.body,
        slug,
        userId: req.user.id,
    });
  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    next(error);
  }

}