var db =require('../config/db');
var SongSchema = db.Schema({
  category:String,
  description:String,
  path:String,
  owner:{type:db.SchemaTypes.ObjectId,ref:'User'}
});

module.exports=SongSchema;
