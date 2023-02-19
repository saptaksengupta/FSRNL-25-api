const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    userId: {
        type: String,
        required: [true, "User Id must be present!"]
    },
    title: {
        type: String,
        required: [true, "Title must be present!"]
    },
    content: {
        type: String,
        required: [true, "Body must be present!"]
    },
    time: {
       type: String,
       required: [true, "TimeStamp must be present!"] 
    },
    updatedAt: {
        type: String,
        required: [true, "Updated TimeStamp must be present!"] 
    }
});

module.exports = mongoose.model('Blog', blogSchema);