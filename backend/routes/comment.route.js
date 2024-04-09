const express = require('express');
const router = express.Router();
const {addComment, getPostComments} = require("../controllers/comment.controller")
const {verifyUser} = require("../utils/verifyUser")

router.post("/addcomment",verifyUser,addComment);
router.get("/getpostcomments/:postId",getPostComments);

module.exports = router;