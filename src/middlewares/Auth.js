const jwt = require('jsonwebtoken');
const { FSRNL_AUTH_TOKEN } = require('../Common/Constants');

const auth = (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({message: "Unauthorized User!"});
        } 

        token = token.split(" ")[1];
        let user = jwt.verify(token, FSRNL_AUTH_TOKEN);
        req.userId = user.id;

        next();
    } catch(err) {
        console.log(err);
        return res.status(401).json({message: "Unautherized User!"});
    }
} 

module.exports = {auth};