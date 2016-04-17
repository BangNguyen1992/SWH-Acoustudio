var router=require('express').Router();
var constants=require('../config/constants');
var User= require('../models/user');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
    clientID: constants.API_ID,
    clientSecret: constants.API_SECRET,
    callbackURL: "http://localhost:3000/login/facebook/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));
router.get('/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

module.exports=router;
