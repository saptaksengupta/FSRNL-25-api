const User = require('../../Models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { FSRNL_AUTH_TOKEN } = require('../../Common/Constants');

const signUp = async (req, res) => {
    const {userName, phone, password} = req.body;
    try {
        const existingUser = await User.findOne({phone: phone}); 
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists!, please try to signin!"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await User.create({
            userName: userName, 
            phone: phone,
            password: hashedPassword
        });

        const token = jwt.sign({phone: result.phone, id: result._id}, FSRNL_AUTH_TOKEN);
        res.status(200).json({user: result, token: token});

    } catch(err) {
        console.log(err);
        res.status(500).json({message: "Something went wrong! :("});
    }
};

const signIn = async (req, res) => {

    const { phone, password } = req.body;

    try {
        // If this user exists or not 
        const existingUser = await User.findOne({phone: phone});
        if (!existingUser) {
            return res.status(404).json({message: "User not found!"});
        }

        // If exists, then check password is valid or not 
        const matchPassword = await bcrypt.compare(password, existingUser.password);
        if (!matchPassword) {
            return res.status(400).json({message: "Invalid Credentials!"});
        }

        // Generate a JWT token for user
        const token = jwt.sign({phone: existingUser.phone, id: existingUser.id}, FSRNL_AUTH_TOKEN);

        // return the user details and token along with the response
        return res.status(200).json({user: existingUser, token: token});
    } catch(err) {
        console.log(err);
        res.status(500).json({message: "Something went wrong!"});
    }
};

module.exports = {signUp, signIn}