var mongoose = require('mongoose');

// Define our user schema
var UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  password: {type: String, require: true},
});

// Export the Mongoose model
module.exports = mongoose.model('User', UserSchema,'User');