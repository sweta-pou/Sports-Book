const router=require('express').Router();
 const user  = require('../modules/user');
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

module.exports= router;