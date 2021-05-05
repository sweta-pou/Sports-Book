var mongoose = require("mongoose");
var bookingSchema = new mongoose.Schema({
    start_time:{type:String},
    end_time:String,
    difference:Number
    
});
var Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;

