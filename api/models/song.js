var db = require('../config/db');
var SongSchema = require('./song-schema');
var Song = db.model('Song',SongSchema);
module.exports = Song;
