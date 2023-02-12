const { Router } = require('express');
const { signUp, signIn } = require('./Controller/AuthController');
const express = require('express');
const router = express.Router();

// SignIn
router.post("/signin", signIn);

// SignUp
router.post("/signup", signUp);

module.exports = router;