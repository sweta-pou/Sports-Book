require('dotenv').config();

const router=require('express').Router();
 const user  = require('../modules/user');
 const Venue = require('../modules/sports');
  const  NodegeoCoder = require("node-geocoder");
const Booking = require('../modules/booking');
const passport = require("passport");
const crypto = require('crypto');
const token = require('../modules/token');
const mailgun = require("mailgun-js");

//===mailgun=====//
const DOMAIN = process.env.DOMAIN;
const mg = mailgun({apiKey: process.env.MAILGUN_API, domain: DOMAIN});

  var options = {
    provider: 'opencage',
   
    // Optional depending on the providers
    httpAdapter: 'https',
    apiKey: process.env.OCD_KEY, // for Mapquest, OpenCage, Google Premier
    formatter:null
  };
  var geocoder = NodegeoCoder(options);

router.post("/register",function (req,res) {
    var email=req.body.email;
    var password=req.body.password;
user.findOne({email:email},function(err,found)
{
    if(found){
        console.log("This email already exists");
        res.send("email already exists!");
    }
    else
    { const newUser =new user({email:email});
        user.register(newUser,password,function(err,register) {
            if(err){console.log(err);}
            else
            {
                var tokens = new token({ user_id: register._id, token: crypto.randomBytes(16).toString('hex') });
                tokens.save(function(err,token)
                       {
                           if(err){console.log(err);}
                           else
                           {
                               var token = token.token;
                            const data = {
                                from: 'Sports-Book@gmail.com',
                                to: req.body.email,
                                subject: 'Email Verification',
                                html:`Hello,<br> Please Click on the link to verify your email.<br> <a href="http:/localhost:9090/api/verification?verify=${token}">click here</a>`
                            };
                            mg.messages().send(data, function (error, body) {
                                console.log(body);
                            });
                            res.send("done");
                           }
                       }
                       );

            }
        })
    }
}
)
});
router.get("/verification",function(req,res)
{ console.log('verification');
   console.log(req.query.verify);
    token.findOne({token:req.query.verify},function(err,Token)
    {
        if(err)
        {
            console.log(err);
        }
        else
        {
            if(!Token)
            {
               res.send("token not found.");

            }
            else
            {
                user.findOne({_id:Token.user_id},function(err,FoundUSer)
                {
                    if(err){console.log(err);}
                    else
                    {
                        FoundUSer.isverified = 'true';
                        FoundUSer.save(err)
                        {
                            if(err){console.log(err);}
                            else
                            {
                                console.log("the account has been verified");
                                res.send("account verrified.Please login .");
                            }
                        }
                    }
                }
                )
            }
        }
    }
    )
}
)

router.post("/add",function(req,res)
{
    console.log("reached");
    geocoder.geocode(req.body.location, function(err, data){
        if(err || !data.length){
            req.flash('error', 'Invalid address');
            return res.redirect('back');
        }
       console.log(data);
         var lat = data[0].latitude;
          var lng  =  data[0].longitude;
          console.log(lat,lng)
          var start = req.body.start_time;
          var end = req.body.end_time;
          var diff= req.body.difference;
            Booking.create({start_time:start,end_time:end,difference:diff},function(err,booking)
            {
                   if(err){console.log(err);}
                   else{
                       
                    var newVenue={name:req.body.name,image:req.body.image,location:req.body.location,
                        description:req.body.description,booking_price:req.body.booking_price,lat:lat,long:lng,booking:booking};
                    Venue.create(newVenue,function(err,venue)
                    {
                        if(err){console.log(err)}
                        else
                        {   
                            console.log(venue);
                        }
                    }
                    )
                   }
            }
            )
        }
        )
}
);
router.post('/login',passport.authenticate('local'
),function(req,res)
   {
    user.findOne({email:req.body.email},function(err,user)
    {
        if(err){console.log(err);}
        else
        { 
              console.log("logged!");
              res.send(req.user);
            }
        
    }
    )
    
   }
);
router.get('/logout',function(req,res)
{
    console.log("loggedout");
}
)

module.exports= router;