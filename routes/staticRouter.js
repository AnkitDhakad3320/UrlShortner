const express = require("express");
const URL = require("../models/url");

const router = express.Router();

const HomePage = "home";
const LoginPage = "login";
const SignupPage = "signup";

router.get("/",async(req, res)=>{
    if(!req.user) return res.redirect(LoginPage);
    const allUrls =  await URL.find({ createdBy: req.user._id});
    return res.render(HomePage,{urls: allUrls});
});

router.get("/signup", (req, res) => {
    return res.render(SignupPage);
});

router.get("/login", (req, res) => {
    return res.render(LoginPage);
});


module.exports = router;