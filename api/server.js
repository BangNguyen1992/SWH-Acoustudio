var express=require('express');
var app = express();
var bodyParser =require('body-parser');
var passport = require('passport');

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(require('./middleware/headers'));
app.use(require('./middleware/validate-session'));
app.use('/api/users',require('./routes/users'));
app.use('/api/login',require('./routes/sessions'));
app.use('/api/songs',require('./routes/songs'));
app.use('/api/upload',require('./routes/upload'));
app.use('/api/combine',require('./routes/combine'));
app.use('/api/login/facebook',require('./routes/oauth'));
app.listen(3000,function(){
  console.log('app is running on port 3000');
});
