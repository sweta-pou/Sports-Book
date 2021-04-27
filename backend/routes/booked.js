require('dotenv').config();
const router=require('express').Router()
const sports = require('../modules/sports');
const Booking = require('../modules/booking');
const Booked = require('../modules/booked');
const mailgun = require("mailgun-js");
 const NodegeoCoder = require("node-geocoder");
const moment = require('moment');

//===mailgun=====//
const DOMAIN = process.env.DOMAIN;
const mg = mailgun({apiKey: process.env.MAILGUN_API, domain: DOMAIN});

//=====submiting booking form for sports venue===//
router.post("/sports/booked",function(req,res){
 console.log("done");
 res.send("done");
})

router.post("/sports/:id/booked",function(req,res)
{ console.log("reached");
    var time = req.body.time;
    var time_array = time.split('-');
    var start_time = time_array[0];
    var end_time = time_array[1];
    if(req.body.date === "")
{
  console.log("omg")
    var dateInServer = new Date ();
    console.log("today");
    console.log(dateInServer);
    console.log("1");
   var convert_date = JSON.stringify(dateInServer);
console.log(convert_date);
var find_date= moment.utc(convert_date,"YYYY-MM-DD").format('DD-MM-YYYY');
console.log(find_date);
var match_date = moment(find_date,"DD-MM-YYYY").format("YYYY/MM/DD");
console.log(match_date);
}
else
{
  console.log("omg 1");
  console.log(req.body.date);

  dateInServer = new Date(req.body.date);
 console.log(dateInServer);
 console.log(dateInServer.getTimezoneOffset());
 let offset = dateInServer.getTimezoneOffset();
 if (offset < 0) {
  dateInServer.setHours(12,0,0);
}
console.log(dateInServer);
  convert_date = JSON.stringify(dateInServer);
 console.log(convert_date);
  find_date= moment.utc(convert_date,"YYYY-MM-DD").format('DD-MM-YYYY');
 console.log(find_date);
 var match_date = moment(find_date,"DD-MM-YYYY").format("YYYY/MM/DD");
 console.log(match_date);
 }
    Booked.findOne({start_time:start_time,end_time:end_time,date:match_date,VenueId:req.params.id},function(err,found)
    {
        if(err){console.log(err);}
        else
        {
            if(found)
            {  //===redirect back with a message ==//
               res.send(" already booked");
        }
        else
        {
    Booked.create({name:req.body.name,email:req.body.email,contact:req.body.contact,start_time:start_time,end_time:end_time,date:match_date,VenueId:req.params.id},function(err,booked)
      {
          if(err){console.log(err);}
          else
          {  var date = booked.date;
            var starting= booked.start_time;
            var ending = booked.end_time;
              sports.findById(req.params.id,function(err,sports)
              {
                  if(err){console.log(err);}
                  else
                  {
                      var name = sports.name;
                      const data = {
                        from:'Sports&fitness@gmail.com' ,
                        to:booked.email,
                        subject: 'Booking Done',
                        html:` Your booking for venue: ${name}  has been successfull.<br> date: ${date}<br> from ${starting} to ${ending}</br>`
                       };
                       mg.messages().send(data, function (error, body) {
                        console.log(body);
                    });
                  }
              }
              )
              //==Booking done and redirect to home page with a message ===//
              res.redirect(301, '/api/sports');
          }
      })
    }}})
}
)


module.exports = router;