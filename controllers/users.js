const { v4: uuidv4 } = require("uuid");
const User = require("../models/users");

const {setUser} = require("../service/auth");

const LoginPage = "login";
const Invalid = "Invalid Email or Password";
const UID = "uid";



async function handleUserSignUp (req, res){
    const {name, email, password} = req.body;
    await User.create({
        name,
        email,
        password,
    });
     return res.redirect("/");
}

async function handleUserLogin (req, res){
    const { email, password} = req.body;
    const user = await User.findOne({email, password});
    if(!user) return res.render("login",{
        error: Invalid,
    })
    // const sessionId = uuidv4();
    // setUser(sessionId, user);

    const token =  setUser(user);
    res.cookie(UID, token);
    return res.redirect("/");
};

module.exports = {
    handleUserSignUp,
    handleUserLogin,
}