const express = require('express');
const router = express.Router();
const {verifyUser}  = require('../utils/verifyUser')
const {create, getPosts} = require('../controllers/blog-post.controller')


router.post('/create',verifyUser,create);
router.get('/getposts',getPosts);

module.exports = router;