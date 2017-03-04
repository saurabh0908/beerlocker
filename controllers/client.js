// Load required packages
var Client = require('../models/client');

// Create endpoint /api/client for POST
exports.postClients = function(req, res) {
  // Create a new instace of the client model
  var client = new Client();

  // Set the client properties that came from the post data
  client.name = req.body.name;
  client.id = req.body.id;
  client.secret = req.body.secret;
  client.userId = req.user._id;

  // Save the client and check for errors
  client.save(function(err) {
    if (err) res.send(err);

    res.json({message: 'Client added to the locker!',data: client});
  });
};

// Create endpoint /api/client for GET
exports.getClients = function(req, res) {
  // Use the client model to find all the clients
  Client.find({userId: req.user._id}, function(err, clients) {
    if (err) res.send(err);
    res.json(clients);
  });
};
