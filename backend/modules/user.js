var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
    email:{type:String,required:true,unique:true},
    password:{type:String},
    timestamp:{type:Date,default:Date.now}
});
userSchema.plugin(passportLocalMongoose,{ usernameField : 'email' });

var User = mongoose.model("User", userSchema);

module.exports = User;

