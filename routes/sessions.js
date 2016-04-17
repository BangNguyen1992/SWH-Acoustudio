var router=require('express').Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var constants=require('../config/constants');
var User= require('../models/user');

router.post('/',(req,res)=>{
  User.findOne({username:req.body.user.username}).then(
    (user)=> {
      if(user){
        bcrypt.compare(req.body.user.pwd,user.passhash,(err,matches)=>{
          if(matches){
            var sessionToken=jwt.sign(user._id.toString(),constants.JWT_SECRET,{expireIn:60*60});
            res.json({
              user:user,
              message:'succesfully authorized',
              sessionToken:sessionToken
            });
          }else{
            res.json({
              user:{},
              message:'Failed to authorized',
              sessionToken:''
            });
          }
        });
      }else{
        res.json({
          user:{},
          message:'Failed to authorized',
          sessionToken:''
        });
      }
    }
  );
});
module.exports=router;
