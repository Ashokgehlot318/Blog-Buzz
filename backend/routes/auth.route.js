const express = require('express');
const router = express.Router();

// const { signup } = require('../controllers/auth.controller');
const {signup, signin, google } = require('../controllers/auth.controller');

router.post('/signup',signup);
router.post('/signin',signin);
router.post('/google',google);

module.exports = router;