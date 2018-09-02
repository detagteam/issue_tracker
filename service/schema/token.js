var mongoose = require('mongoose');

// Define our client schema
var TokenSchema = new mongoose.Schema({
    accessToken: { type: String, unique: true },
    refreshToken: { type: String },
    expiresAt: { type: Date },
    scope: { type: String },
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
    // clientId: { type: String, unique: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    // userId: { type: String }
});

// Export the Mongoose model
module.exports = mongoose.model('Token', TokenSchema,'tokens');