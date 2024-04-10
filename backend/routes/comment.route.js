const express = require('express');
const router = express.Router();
const {addComment, getPostComments, likeComment} = require("../controllers/comment.controller")
const {verifyUser} = require("../utils/verifyUser")

router.post("/addcomment",verifyUser,addComment);
router.get("/getpostcomments/:postId",getPostComments);
router.put("/likecomment/:commentId",verifyUser,likeComment);

module.exports = router;