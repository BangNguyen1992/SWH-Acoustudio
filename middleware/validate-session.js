var jwt =require('jsonwebtoken');
var User = require('../models/user');
var constants = require('../config/constants');

module.exports=(req,res,next)=>{
  var sessionToken = req.headers.authorization;
  if(!req.body.user && sessionToken){
    jwt.verify(sessionToken,constants.JWT_SECRET,(err,decodedId)=>{
      if(decodedId){
        console.log(decodedId);
        User.findOne({_id:decodedId}).then((user)=>{
          console.log(user);
          req['user']=user;
          next();
        },(err)=>{
          console.log(err);
          res.send(401,"not authorized");
        });
      }else{
        res.send(401,"not authorized");
      }
    });
<<<<<<< HEAD
  }else if(req.body.user|| req.url=='/app/index.html' || req.url=='/'||req.isAuthenticated()||req.url=='/facebook/login') {
=======
  }else if(req.body.user){
>>>>>>> dea998c8cae1e03c0799ca6c9821741e1fba341c
    next();
  }else{
    res.send(401,"not authorized");
  }
};
