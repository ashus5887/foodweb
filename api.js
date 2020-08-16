const express = require("express");//it is a framework written on node, middleware as manipulates req and res//node is an environment

const cookieParser = require("cookie-parser");//user doesn't send cookie every time, with this the client is asked to send cookie every time
const mongoSanitize = require("express-mongo-sanitize") //used for removing queries, eg: if user sends email: {$gt:""} then everything would be displayed, sanitize removes dollar
const hpp = require("hpp") // prevents from parameter pollution, eg: two sorts
const bcrypt = require("bcrypt")//decrypting the password and all 
const rateLimit = require("express-rate-limit")

const app = express();

app.use(mongoSanitize())
app.use(hpp())
app.use(express.json())//so that the server does not ignore the json data
app.use(cookieParser());   //used during jwt
app.use(express.urlencoded({extended:true}));//To take input from the form as in update details page   
//to make sub-section basically, user ka kaam user wali jagah hi hoga

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, //15 minutes
    max: 1000,
    message: "You have exceeded the max request limit,   api.js limiter"
})

var userRouter = require("./router/userRouter");
var planRouter = require("./router/planRouter");
var viewRouter = require("./router/viewRouter");
var bookingRouter = require("./router/bookingRouter");
//if booking is added it would be added here

app.use(express.static("public"));//this is essentially the public folder which will be delivered to the client
//These file are served to the client
app.use(limiter);
                             
//to study this we can study on express website, search express()                               


// This is being done using pug
        //View folder is created for it
app.set("view engine", "pug")
app.set("views", "./view");

app.use("/", viewRouter)
app.use("/api/user", userRouter);
app.use("/api/plan", planRouter);
app.use("/api/booking", bookingRouter);

module.exports = app;

/*
app.use(express.static("public"))
Note that  when this code is executed and the express.static("public") is run
then index.html is automatically run, if index.html was named something like overview.html
then it wouldnt have run automatically which is rquired as for this project we are using the pug rendering

when http://localhost:3000/ is run then it essentially telling to run the folder names public
all requests go to the public folder now
*/