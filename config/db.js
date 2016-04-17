var db =require('mongoose');
db.connect('mongodb://admin:admin@localhost/cooking');

module.exports = db;
