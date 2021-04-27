var mongoose = require("mongoose");
var Venue= require("./sports");
var User= require("./user");
var bookedSchema = new mongoose.Schema({
    VenueId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Venue"
    },
    UserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    name:String,
    email:String,
    contact:Number,
    date:String,
    start_time:String,
    end_time:String,
    price:Number
});
var Booked = mongoose.model("Booked", bookedSchema);

module.exports = Booked;

