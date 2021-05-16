var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
var token = require("./token.js");

var userSchema = new mongoose.Schema({
    email:{type:String,required:true,unique:true},
    password:{type:String},
    timestamp:{type:Date,default:Date.now},
    isverified:{type:Boolean,default:false},
    verificationExpires: {
        type: Date,
        default: () => new Date(+new Date() + 15 * 60 * 1000) //3 minutes
      }
});
userSchema.plugin(passportLocalMongoose,{ usernameField : 'email' });

var User = mongoose.model("User", userSchema);

module.exports = User;

