var router = require('express').Router();

router.get('/',(req,res)=>{
  res.sendFile('/home/beochot/Desktop/acous/Acoustudio/app/index.html');
});
module.exports=router;
