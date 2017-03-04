var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var beerController = require('./controllers/beer');
var userController = require('./controllers/user');
var authController = require('./controllers/auth');


// Connect to the beerlocker mongoose db
mongoose.connect('mongodb://localhost:27017/beerlocker');

var app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

// Use the passport package in our application
app.use(passport.initialize());

var port = process.env.port || 3000

var router = express.Router()

// Create endpoint handlers for /beers
router.route('/beers')
  .post(authController.isAuthenticated, beerController.postBeers)
  .get(authController.isAuthenticated, beerController.getBeers);

// Create endpoint for /beers/:beer_id
router.route('/beers/:beer_id')
  .get(authController.isAuthenticated, beerController.getBeer)
  .put(authController.isAuthenticated, beerController.putBeer)
  .delete(authController.isAuthenticated, beerController.deleteBeer);

// Create endpoint handlers for /users
router.route('/users')
  .post(userController.postUsers)
  .get(authController.isAuthenticated, userController.getUsers);

// Register all our router with /api
app.use('/api', router);


// Start the server
app.listen(port);
// console.log('Insert beer on port ' + port);
