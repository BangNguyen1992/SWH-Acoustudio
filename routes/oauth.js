var router=require('express').Router();
var constants=require('../config/constants');
var User= require('../models/user');
var passport=require('../config/passport')


router.get('/login', passport.authenticate('facebook'));
router.get('/login/callback',
  passport.authenticate('facebook', {
       successRedirect : '/',
       failureRedirect: '/login'
  }),
  function(req, res) {
    res.redirect('/');
  });
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

module.exports=router;
