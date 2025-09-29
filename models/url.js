 const mongoose = require("mongoose");

 const REF = "users";
 const C_NAME = "url";



 const urlSchema = new mongoose.Schema({
    shortId:{
        type:String,
        required:true,
        unique:true,
    },
    redirectUrl:{
        type:String,
        required:true,
    },
    visitHistory:[{timestamp:{type:Number}}],
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:REF,
    }
 },{timestamps:true});

 const  URL = mongoose.model(C_NAME, urlSchema);

 module.exports = URL;