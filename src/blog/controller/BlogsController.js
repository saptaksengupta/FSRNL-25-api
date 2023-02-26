const { response } = require("express");
const Blog = require("../../Models/Blog");

const getBlogs = async (req, res) => {
    const { userId } = req;
    try {
        const result = await Blog.find().sort({time: 'desc'});
        return await res.status(200).json({blogs: result});
    } catch(err) {
        console.log(err);
        return res.status(500).json({message: "Something went wrong while fetching blogs!"});
    }
}

const createBlog = async (req, res) => {
    const {userId} = req;
    const {title, content} = req.body;

    if (!title) {
        return res.status(400).json({message: "Title must be present!"});

    }

    if (!content) {
        return res.status(400).json({message: "Content is missing!"});
    }

    try {
        const result = await Blog.create({
            userId: userId,
            title: title,
            content: content,
            time: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        });
        return res.status(200).json({blog: result});
    } catch(err) {
        console.log(err);
        res.status(500).json({message: "Something went wrong! :("});
    }

    
}

module.exports = {getBlogs, createBlog}