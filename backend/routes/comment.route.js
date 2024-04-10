const express = require('express');
const router = express.Router();
const {addComment, getPostComments, likeComment, editComment} = require("../controllers/comment.controller")
const {verifyUser} = require("../utils/verifyUser")

router.post("/addcomment",verifyUser,addComment);
router.get("/getpostcomments/:postId",getPostComments);
router.put("/likecomment/:commentId",verifyUser,likeComment);
router.put("/editcomment/:commentId",verifyUser,editComment);

module.exports = router;