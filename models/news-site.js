var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var newsSight = new Schema({
  "title": String,
  "category": String,
  "url": String,
  "hostname": String,
  "pathname": String,
  "politicalAlignment":String,
  "notes": String,
});

module.exports = mongoose.model('newssite', newsSight);
