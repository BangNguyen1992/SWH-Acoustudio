var router =require('express').Router();
var Song = require('../models/song');
var SoxCommand = require('sox-audio');

router.post('/',(req,res)=>{
  var ids=[req.body.instrument,req.body.vocal];
  var newFile;
  var command = SoxCommand();
  Song.find({_id: {$in: ids}}).then((songs)=>{
    newFile="./storage/"+"combio-"+Date.now()+".wav";
    console.log("output ne"+newFile);
    console.log("first : "+songs[0].path);
    console.log("second : "+songs[1].path);

    //.input("./storage/naruto.wav")
    //.input("./storage/fate.wav")
    command.input('./'+songs[0].path)
    .input('./'+songs[1].path)
    .output(newFile)
    .outputFileType("wav")
    .combine('merge');

    command.run();
  });
  command.on('error', function(err, stdout, stderr) {
  console.log('Cannot process audio: ' + err.message);
  console.log('Sox Command Stdout: ', stdout);
  console.log('Sox Command Stderr: ', stderr)
  });
  command.on('end', function() {
    var s = new Song({
        owner:req.user,
        path:newFile,
        catergory:"combo",
        description:req.body.description
    });
    s.save().then((song)=>{
      res.json({
        message:'saved!',
        song:song
      });
    });
  console.log('Sox command succeeded!');
});


});
module.exports=router;
