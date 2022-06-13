const jwt = require('jsonwebtoken');

exports.generateAccessToken=(username)=>{
    return jwt.sign(username, process.env.TOKEN_SECRET);
}