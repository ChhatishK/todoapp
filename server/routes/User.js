const express = require('express');
const { signup, login } = require('../controllers/Auth');
const { auth } = require('../middlewares/auth');
const { updateUserDetails } = require('../controllers/User');
const router = express.Router();

// signup route
router.post('/signup', signup);
// login route
router.post('/login', login)

// update user details
router.put('/update-user', auth, updateUserDetails);

module.exports = router;