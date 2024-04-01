const express = require('express');
const router = express.Router();

const { test , updateUser} = require('../controllers/user.controller');
const { verifyUser } = require('../utils/verifyUser');


router.get('/test', test);
router.put('/update/:userId',verifyUser ,updateUser);


module.exports = router;