var express = require("express");
var cors = require('cors');
var app = express();
var bodyParser = require("body-parser");

//mongoose stuffs
var mongoose = require('mongoose');
var campsiteSchema = new mongoose.Schema({
  campsite: String,
});
var reviewSchema = new mongoose.Schema({
  user: String,
  review: String,
  rating: Number,
  campsite_id: String,
},
  { timestamps: { createdAt: 'created_on', updatedAt: 'updated_on' }
});
var Campsite = mongoose.model('Campsite', campsiteSchema);
var Review = mongoose.model('Review', reviewSchema);

mongoose.connect('mongodb://apg:apg@ds023468.mlab.com:23468/apgtestdb');

var port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended": false}));
app.use(cors());

//var router = express.Router();

//welcome message on root
app.get('/', function(req, res) {
  res.json({message: "Welcome to the campsites API"})
})

//get all
app.get('/campsites', function(req, res) {
  Campsite.find({}, function(err, campsite) {
    if (err) throw err;
    res.json(campsite);
  });
});


//get by state
app.get('/campsites/state/:state', function(req, res) {
  Campsite.find({state: req.params.state}, function(err, campsite) {
    if (err) throw err;
    res.json(campsite);
  });
});

//get by id
app.get('/campsites/:id', function(req, res) {
  Campsite.findById(req.params.id, function(err, campsite) {
    if (err) throw err;
    res.json(campsite);
  });
});

//get all reviews
app.get('/reviews', function(req, res) {
  Review.find({}, function(err, review) {
    if (err) throw err;
    res.json(review);
  });
});

//post review
app.post('/reviews', function(req, res) {
  var review = new Review();
  review.user = req.body.user;
  review.review = req.body.review;
  review.rating = req.body.rating;
  review.campsite_id = req.body.campsite_id;

  review.save(function(err) {
    if (err) throw err;
    res.json({message: 'Review saved!'});
  });
});

//get reviews by campsite_id
app.get('/reviews/:campsite_id', function(req, res) {
  Review.find({campsite_id: req.params.campsite_id}, function(err, review) {
    if (err) throw err;
    res.json(review);
  });
});

//app.use('/api', router);

app.listen(port);
console.log(`Listening on PORT:${port}`);
