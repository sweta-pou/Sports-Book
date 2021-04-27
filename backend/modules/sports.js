var mongoose = require("mongoose");
var Booking = require("./booking");

var venueSchema = new mongoose.Schema({
  name: String,
  image:String,
  description:String,
  location:String,
  lat:Number,
  long:Number,
  booking_price:Number,
  category:{type:String, default:'sports'},
  type:String,
booking:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Booking"
  }

});
var Venue = mongoose.model("Venue", venueSchema);

module.exports = Venue;
