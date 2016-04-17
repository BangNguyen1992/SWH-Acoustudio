var router =require('express').Router();
var Song = require('../models/song');
//get
router.get('/',(req,res)=>{
  console.log("get user ",req.user);
  Song.find({owner: req.user}).then((songs)=>{
    res.json(songs);
  });
});

router.post('/',(req,res)=>{
  console.log("post song ",req.user);
  var s;
  if(req.body.blob){
    var path ="storage/blob"+ '-' + Date.now()+".wav";
    var buf = new Buffer(req.body.blob, 'base64'); // decode
    fs.writeFile(path, buf, function(err) {
      if(err) {
        console.log("err", err);
      } else {
        s = new Song({
          owner:req.user,
          path:path,
          name:req.body.song.name,
          artist:req.body.song.artist,
          catergory:req.body.song.category,
          description:req.body.song.description
        });
      }
    });
  }else{
    s = new Song({
      owner:req.user,
      path:"",
      name:req.body.song.name,
      artist:req.body.song.artist,
      catergory:req.body.song.category,
      description:req.body.song.description
    });
  }

  s.save().then((song)=>{
    res.json({
      message:'saved!',
      song:song
    });
  });
});

router.put('/:id',(req,res)=>{
  Song.findOne({_id:req.params.id,owner:req.user})
  .then((song)=>{
    song.category=req.body.song.category;
    if(req.body.song.lyric)
    song.lyric=req.body.song.lyric;
    song.description=req.body.song.description;
    song.save().then((song)=>{
      res.json({
        message:'updated!',
        song:song
      });
    });
  });
});

router.delete('/:id',(req,res)=>{
  Song.findOne({_id:req.params.id,owner:req.user}).
  then((song)=>{
    song.remove().then(()=>{
      res.json({
        message:'deleted!',
        song:song
      });
    });
  });
});
module.exports=router;
