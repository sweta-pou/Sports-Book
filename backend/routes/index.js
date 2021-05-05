require('dotenv').config();

const router=require('express').Router();
 const user  = require('../modules/user');
 const Venue = require('../modules/sports');
  const  NodegeoCoder = require("node-geocoder");
const Booking = require('../modules/booking');
const passport = require("passport");

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
    }
    else
    { const newUser =new user({email:email});
        user.register(newUser,password,function(err,register) {
            if(err){console.log(err);}
            else
            {
                console.log(register);
                res.send("done");
            }
        })
    }
}
)
});
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
            })})
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

              req.flash("success","Sucessfully loggedin");  
              console.log("logged!");
              res.send(req.user);

            //   res.redirect("/campgrounds");
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