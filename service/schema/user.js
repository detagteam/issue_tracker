var mongoose = require('mongoose');

// Define our user schema
var UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  password: {type: String, require: true,select : false},
  __v :{select:false},
  tokens : [{type: mongoose.Schema.Types.ObjectId , ref : 'Token'}]
});

// Export the Mongoose model
module.exports = mongoose.model('User', UserSchema,'users');