var router =require('express').Router();
var Song = require('../models/song');
var multer  = require('multer');
//var upload = multer({ dest: './storage/' })
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './storage');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now()+".wav");
  }
});

var upload = multer({ storage: storage });
router.post('/:id', upload.single('file'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  Song.findOne({_id:req.params.id})
  .then((song)=>{
    song.path=req.file.path;
    console.log("huhu"+song.path);
    song.save().then((song)=>{
      res.json({
        message:'updated!',
        song:song
      });
    });
  });
});
module.exports = router;
