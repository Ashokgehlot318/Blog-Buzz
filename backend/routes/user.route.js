const express = require('express');
const router = express.Router();

const { test , updateUser, deleteUser, signout, getUsers, getUser} = require('../controllers/user.controller');
const { verifyUser } = require('../utils/verifyUser');


router.get('/test', test);
router.put('/update/:userId',verifyUser ,updateUser);
router.delete('/delete/:userId',verifyUser ,deleteUser);
router.post("/signout",signout);
router.get("/getusers",verifyUser,getUsers); // for admin page api route

router.get("/:userId",getUser); // for comment api route



module.exports = router;