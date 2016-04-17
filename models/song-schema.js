var db =require('../config/db');
var SongSchema = db.Schema({
  name:String,
  artist:String,
  category:String,
  description:String,
  path:String,
  lyric:String,
  owner:{type:db.SchemaTypes.ObjectId,ref:'User'}
});

module.exports=SongSchema;
