const oauthServer = require('oauth2-server'),
      oauthModel = require('../models/oauth')

module.exports = new oauthServer({
    model: oauthModel.model,
    grants : ['password','refresh_token'],
    debug: true
});