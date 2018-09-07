const mongoose = require('mongoose');

// Define our client schema

let OAuthClientsSchema =  new mongoose.Schema({
  clientId: String,
  clientSecret: String,
  clientName : String,
  tokens : [{type : mongoose.Schema.Types.ObjectId , ref : 'Token'}]
  // grant_types : String,
});
// Export the Mongoose model
module.exports = mongoose.model('Client', OAuthClientsSchema,'clients');