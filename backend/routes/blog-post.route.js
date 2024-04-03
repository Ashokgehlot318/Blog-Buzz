const express = require('express');
const router = express.Router();
const {verifyUser}  = require('../utils/verifyUser')
const {create} = require('../controllers/blog-post.controller')


router.post('/create',verifyUser,create);

module.exports = router;