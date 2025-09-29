const express = require("express");
const path = require("path");

const URL = require("./models/url");

const urlRouter = require("./routes/url");
const {connectMongoDB} = require("./connect");
const staticRouter = require("./routes/staticRouter")
const usersRouter = require("./routes/users")

const app = express();
const PORT = 8001;

connectMongoDB("mongodb://localhost:27017/urlShortner")
.then(()=>console.log("MongoDB Connected"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views")); 

app.use(express.json());
app.use(express.urlencoded ({extended:false}));

app.get('/test', async(req, res)=>{
    const allUrls = await URL.find({});
    return res.render("home", {
        urls: allUrls,
    });
});

app.use("/url" , urlRouter);
app.use("/", staticRouter);
app.use("/users",usersRouter);

app.get('/url/:shortId', async(req, res)=>{
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
    {
        shortId
    },
    {
        $push:{
            visitHistory:{
                timestamp:Date.now(),
            }
        }
    })
    if(entry){
        res.status(302).redirect(entry.redirectUrl); 
    }else{
        res.status(404).send("Not Found");
    }
});

app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));