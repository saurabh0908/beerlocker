var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Beer = require('./models/beer');
// Connect to the beerlocker mongoose db
mongoose.connect('mongodb://localhost:27017/beerlocker');

var app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

var port = process.env.port || 3000

var router = express.Router()

router.get('/', function(req, res) {
  res.json({message: 'You are running low on beer'});
});
// Register all our router with /api
app.use('/api', router);

// Create a new route with prefix beers
var beersRoute = router.route('/beers');

// Create an endpoint /api/beers for POSTS
beersRoute.post(function(req, res) {
  // Create a new instance of the Beer model
  var beer = new Beer();

  // Set the beer properties that came from the POST data
  beer.name = req.body.name;
  beer.type = req.body.type;
  beer.quantity = req.body.quantity;

  // Save the beer and check for errors
  beer.save(function(err){
    if (err)
      res.send(err);
    res.json({message: 'Beer added to the locker!', data: beer});
  });
});


beersRoute.get(function(req, res) {
  // User the Beer model to find all beer
  Beer.find(function(err, beers) {
    if (err)
    res.send(err);
    res.send(beers);
  });
});










// Start the server
app.listen(port);
console.log('Insert beer on port ' + port);
