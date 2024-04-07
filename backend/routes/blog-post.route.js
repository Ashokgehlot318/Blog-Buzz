const express = require('express');
const router = express.Router();
const {verifyUser}  = require('../utils/verifyUser')
const {create, getPosts, deletePost,updatePost} = require('../controllers/blog-post.controller')


router.post('/create',verifyUser,create);
router.get('/getposts',getPosts);
router.delete('/deletepost/:postId/:userId', verifyUser, deletePost);
router.put('/updatepost/:postId/:userId', verifyUser, updatePost);

module.exports = router;