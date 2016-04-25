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

var port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended": false}));

var router = express.Router();

//get all
router.get('/campsites', function(req, res) {
  Campsite.find({}, function(err, campsite) {
    if (err) throw err;
    res.json(campsite);
  });
});

//get by state
router.get('/campsites/:state', function(req, res) {
  Campsite.find({state: req.params.state}, function(err, campsite) {
    if (err) throw err;
    res.json(campsite);
  });
});

app.use('/api', router);

app.listen(port);
