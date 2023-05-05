const express = require('express');
const { registerUser, getUserProfile, loginUser } = require('../Controllers/userCtrl');
const { isLoggedIn } = require('../Middlewares/isLoggedIn');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', isLoggedIn, getUserProfile);

module.exports = router;
