// Load the required packages
var Beer = require('../models/beer');

// Create the end point /api/beers for POSTS

exports.postBeers = function(req, res) {
  // Create a new instance of the Beer model
  var beer = new Beer();

  // Set the beer properties that came from the POST data
  beer.name = req.body.name;
  beer.type = req.body.type;
  beer.quantity = req.body.quantity;
  beer.userId = req.user._id;

  // Save the beer and check for errors
  beer.save(function(err){
    if (err)
      res.send(err);
    res.json({message: 'Beer added to the locker!', data: beer});
  });

};

// Create the end point for /api/beers for GET
exports.getBeers = function(req, res) {
  // User the Beer model to find all beer
  Beer.find({userId: req.user._id},function(err, beers) {
    if (err)
    res.send(err);
    res.send(beers);
  });
};

// Create endpoint /api/beers/:beer_id for GET
exports.getBeer = function(req, res) {
  // Use the beer module to find the specific beer
  Beer.find({userId: req.user._id, _id: req.params.beer_id}, function(err, beer) {
    if (err)
      res.send(err);

    res.json(beer);
  });
};

// Create endpoint /api/beers/:beer_id for PUT

exports.putBeer = function(req, res) {
  // Use the beer model to find the specific beer
  Beer.update({userId: req.user._id, _id: req.params.beer_id}, {quantity: req.body.quantity},  function(err, num, raw) {
    if (err)
      res.send(err);
    // Update the existing beer quantity
    beer.quantity = req.body.quantity;

    // Save the beer and check for error
    beer.save(function(err) {
      if (err)
        res.send(err);

      res.json(beer);
    });
  });
};

// Create endpoint /api/beers/:beer_id for DELETE

exports.deleteBeer = function(req, res) {
  Beer.findByIdAndRemove(req.params.beer_id, function(err) {
    if (err)
      res.send(err);

    res.json({message: 'Beer removed from the locker!'});
  });

}
