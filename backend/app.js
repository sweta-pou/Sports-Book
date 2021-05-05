const express = require('express')
const app = express();
const path = require('path');
const fileupload = require('express-fileupload');
const mongoose = require('mongoose');
const bodyParsor = require('body-parser');
const cors = require('cors');
const passport =  require("passport");
const LocalStrategy = require("passport-local");
 const  passportLocalMongoose = require("passport-local-mongoose");
 const user = require('./modules/user');
const flash = require('connect-flash');
app.use(cors());
     app.use(bodyParsor.json());
     //===mongoDB setup===//

mongoose.connect('mongodb://localhost:27017/sports_fitness1',{ useNewUrlParser: true,
    useUnifiedTopology: true,useCreateIndex:true },function (err,done)
     {
        if(err){console.log("DB not connected")}
    else
    {
        console.log("Database connected");
    
    }
    });
//files setup
app.use("/images",express.static(path.join(__dirname+"/images")));
// app.use("/css",express.static(__dirname+"/css"));

//db


//call routing level middleware

const sportsRoute = require('./routes/sports');
const bookedRoute = require('./routes/booked');
const Index = require('./routes/index');


var images = path.join(__dirname+'/images');
app.use(fileupload({
    useTempFiles: true,
    tempFileDir: images
}));




//inbuilt middleware for parsing incoming data
app.use(express.urlencoded({ 
    extended: true
}))
app.use(express.json()) //(for json)

//load routing level middleware(mount)
app.use(flash());
app.use(require("express-session")(
{
    secret:"this is yelpcamp",
    resave:false,
    saveUninitialized:false
}
));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(
    ({ 
        usernameField: 'email',    
        passwordField: 'password'
      }),user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.use(function(req,res,next)
{
    console.log(req.user);
    if(req.user)
    {
         res.locals.currentUser = req.user;}
    else
    {
        res.locals.currentUser = null;
    }
    
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    console.log(res.locals.currentUser);
    next();
}
)
app.use('/api',sportsRoute);
app.use('/api',bookedRoute);
app.use('/api',Index);
app.use(function (req, res, next) { //for undefined request
    next({
        msg: 'NOT FOUND 404',
        status: 404
    })
})

//error handling middleware
app.use(function (err, req, res, next) {
    console.log('Error is >>', err)
    res.json({
        msg: err.msg || err,
        status: err.status||400
    })
})



app.listen(9090, function (err, done) {
    if (err) {
        console.log('Server listening failed')
    } else {
        console.log('Server listening at port 9090');
    }
})