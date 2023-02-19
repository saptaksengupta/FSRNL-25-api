const express = require('express');
const { auth } = require('../middlewares/Auth');
const { getBlogs, createBlog } = require('./controller/BlogsController');
const router = express.Router();

router.get("/", auth, getBlogs); 
router.post("/", auth, createBlog);

module.exports = router;