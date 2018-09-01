var mongoose = require('mongoose');

// Define our client schema

var OAuthClientsSchema =  new mongoose.Schema({
  clientId: String,
  clientSecret: String,
  clientName : String
});
// Export the Mongoose model
module.exports = mongoose.model('oauth_client', OAuthClientsSchema,'clients');