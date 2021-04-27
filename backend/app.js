const express = require('express')
const app = express();
const path = require('path');
const fileupload = require('express-fileupload');
const mongoose = require('mongoose');
const bodyParsor = require('body-parser');
const cors = require('cors');

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

app.use('/api',sportsRoute);
app.use('/api',bookedRoute);





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