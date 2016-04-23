var express = require("express");
var app = express();
var bodyParser = require("body-parser");

//mongoose stuffs
var mongoose = require('mongoose');
var campsiteSchema = new mongoose.Schema({
  //schema shit
});
var Campsite = mongoose.model('Campsite', campsiteSchema);
mongoose.connect('mongodb://apg:apg@ds023468.mlab.com:23468/apgtestdb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended": false}));

app.get('/campsites', function(req, res) {
  Campsite.find({}, function(err, campsite) {
    if (err) throw err;
    res.json(campsite);
  });
});

app.listen(3000);
console.log("Listening to PORT 3000");
