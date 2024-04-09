const express = require('express');
const router = express.Router();
const {addComment} = require("../controllers/comment.controller")
const {verifyUser} = require("../utils/verifyUser")

router.post("/addcomment",verifyUser,addComment);

module.exports = router;