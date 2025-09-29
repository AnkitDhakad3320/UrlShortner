require('dotenv').config(); 
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

const URL = require("./models/url");
const urlRouter = require("./routes/url");
const {connectMongoDB} = require("./connect");
const staticRouter = require("./routes/staticRouter")
const usersRouter = require("./routes/users");
const { restrictToLoggedInUsersOnly, checkAuth } = require("./middlewares/auth");

const NOT_FOUND = "Not Found";
const MONGO_CONNECTED = "MongoDB Connected"
const HomePage = "home";
const SERVER_PORT = "Server running on port:";


const app = express();
const PORT = process.env.PORT;

connectMongoDB(process.env.DB_URL)
.then(()=>console.log(MONGO_CONNECTED));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views")); 

app.use(express.json());
app.use(express.urlencoded ({extended:false}));
app.use(cookieParser());

app.get('/test', async(req, res)=>{
    const allUrls = await URL.find({});
    return res.render(HomePage, {
        urls: allUrls,
    });
});

app.use("/url" ,restrictToLoggedInUsersOnly, urlRouter);
app.use("/",checkAuth, staticRouter);
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
        res.status(404).send(NOT_FOUND);
    }
});

app.listen(PORT,()=>console.log(SERVER_PORT, PORT));