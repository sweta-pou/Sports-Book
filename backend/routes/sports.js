const router=require('express').Router();
const sports = require('../modules/sports');
const Booked = require('../modules/booked');
const Booking = require('../modules/booking');
const convert = require("../helpers/SlotDetails");
const moment = require('moment');
const fs = require('fs');

//===sports get request===//
router.get("/sports",function(req,res)
{
    console.log(req.query.search);
 
    if(req.query.search)
        {var noMatch;
            console.log(req.query.search);
                const regex = new RegExp(escapeRegex(req.query.search), 'gi');
                sports.find({ "name": regex }, function(err, foundSports) {
                    if(err) {
                        console.log(err);
                    } else {
                        
                        if(sports.length<1)
                        {
                             noMatch ="doesnot match";
                        }
                res.send(foundSports);
                       
                    }
            })
            }
            else{
                sports.find({},function(err,foundSports)
                {
                res.send(foundSports);

                })

            }}

);


//===individual sports venue display===/
router.get("/sports/:id",function(req,res)
{
    sports.findById(req.params.id,function(err,venue)
    {
        if(err){console.log(err);}
        else
        { 
            //====render====//
            // res.render("venue/sports_info.ejs",{venue: venue})
            res.send(venue);
        
    }
    
})
});
//===slots display request for booking sports venue ====//
router.get("/sports/:id/booking",function(req,res)
{
    if(req.query.date == null)
{
      var dateInServer = new Date ();
      console.log(dateInServer);
       var convert_date = JSON.stringify(dateInServer);
       console.log(convert_date);
       var find_date= moment.utc(convert_date,"YYYY-MM-DD").format('DD-MM-YYYY');
       var match_date = moment(find_date,"DD-MM-YYYY").format("YYYY/MM/DD");
       console.log(match_date);
}
else{
    dateInServer = new Date(req.query.date);
    console.log(dateInServer);
     convert_date = JSON.stringify(dateInServer);
     find_date= moment.utc(convert_date,"YYYY-MM-DD").format('DD-MM-YYYY');
    var match_date = moment(find_date,"DD-MM-YYYY").format("YYYY/MM/DD");
    console.log(match_date);
}
sports.findById(req.params.id,function(err,foundVenue){
  if(err){console.log(err);}
  else
  { 
    var not_start = new Array();
    Booking.findById(foundVenue.booking,function(err,foundBook)
    {
        
        var start =convert.startSlice(foundBook.start_time);
        var end = convert.endslice(foundBook.end_time);
        console.log(start);
        console.log(end);

        console.log(parseInt(start));
        var time_array = convert.calculate_time_slot(parseInt(start),parseInt(end),foundBook.difference);
        console.log(time_array);
        Booked.find({VenueId:foundVenue.id,date:match_date},function(err,foundBooked)
        {
            
            for(var i=0;i<foundBooked.length;i++)
            {
                var start_slot = foundBooked[i].start_time;
                not_start.push(start_slot);
                
            }
            console.log(not_start);
            //====render=====//
            res.send({time_array,foundBook,foundVenue,not_start,match_date})
            // res.render("venue/book.ejs",{time_array:time_array,foundBook:foundBook,foundVenue:foundVenue,length:time_array.length,
            //     booked:booked,not_start:not_start,length1:not_start.length,match_date:match_date});
        })
         })
  }
})
}
)

//==fuzzy search ==//
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = router;
