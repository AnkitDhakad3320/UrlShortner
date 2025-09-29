// const sessionIdtoUserMap = new Map();
const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET;

function  setUser(user){
    // sessionIdtoUserMap.set(id, user); 
    return jwt.sign({
        user:user._id,
        email: user.email,
    }, secretKey);  
}

function getUser(token){
    // return sessionIdtoUserMap.get(id);
    if(!token) return null;
    return jwt.verify(token, secretKey);
}

module.exports = {
    setUser,
    getUser, 
}