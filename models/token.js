// Load required packages
var mongoose = require('mongoose');

// Define our token schema
var TokenSchema = new mongoose.Schema({
  value: { type: String, required: true},
  userId: { type: String, required: true},
  clientId: { type: String, required: true}
});

// Export the mongoose model
module.exports = mongoose.model('Token', TokenSchema);
