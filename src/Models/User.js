const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "UserName must be present!"]
    },
    phone: {
        type: Number,
        required: [true, "Phone must be present!"]
    }, 
    password: {
        type: String,
        required: [true, "Password must be present!"]
    }
});

module.exports = mongoose.model('User', userSchema);