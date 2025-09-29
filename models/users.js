const mongoose = require("mongoose");

const C_NAME = "user";


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    }
},{timestamps:true});

const User = mongoose.model(C_NAME, userSchema);

module.exports = User;