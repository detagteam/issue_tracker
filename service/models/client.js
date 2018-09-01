
var mongoose = require('mongoose');
var OAuthClientsSchema = require('../schema/client')
var authorizedClientIds = ['web', 'mobile'];

exports.model = OAuthClientsSchema

exports.getClient = function(clientId, clientSecret, callback) {
  var params = { clientId: clientId };
  if (clientSecret != null) {
    params.clientSecret = clientSecret;
  }
  OAuthClientsModel.findOne(params, callback);
};

exports.grantTypeAllowed = function(clientId, grantType, callback) {
  if (grantType === 'password' || grantType === 'authorization_code') {
    return callback(false, authorizedClientIds.indexOf(clientId) >= 0);
  }
  callback(false, true);
};

