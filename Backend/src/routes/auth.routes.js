const express = require('express');
const router = express.Router();
const { registerUser ,loginUser,logoutUser,getMe} = require('../controllers/auth.controller');
const authUser = require('../middlewares/auth.middleware')

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser);
router.post('/logout', logoutUser);
router.get('/get-me', authUser, getMe);
router.post('/get-me', authUser, getMe);

module.exports = router;