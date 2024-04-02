const express = require('express');
const router = express.Router();

const { test , updateUser, deleteUser, signout} = require('../controllers/user.controller');
const { verifyUser } = require('../utils/verifyUser');


router.get('/test', test);
router.put('/update/:userId',verifyUser ,updateUser);
router.delete('/delete/:userId',verifyUser ,deleteUser);
router.post("/signout",signout);


module.exports = router;