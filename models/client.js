var mongoose = require('mongoose');

// Define our client schema
var ClientSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  client_id: { type: String, required: true },
  client_secret: { type: String, required: true },
  userId: { type: String, required: true },
  profile: { type: String, required: true }
});

// Export the Mongoose model
module.exports = mongoose.model('Client', ClientSchema,'Client');