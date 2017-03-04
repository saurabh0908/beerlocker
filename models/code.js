// Load required packages
var mongoose = require('mongoose');

// Define our token schema
var CodeSchema = new mongoose.Schema({
  value: { type: String, required: true},
  redirectUri: { type: String, required: true},
  userId: { type: String, required: true},
  clientId: { type: String, required: true},
});

// Export the mongoose model
module.exports = mongoose.model('Code', CodeSchema);
