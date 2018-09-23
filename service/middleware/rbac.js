const mongoose = require('mongoose'),
    oauthserver = require('oauth2-server'),
    oauth = require('../components/oauthDriver'),
    apiColMapActions = require('../models/api_collection_map'),
    authenticate = require('../middleware/authenticate');

let BYPASS_FOR_URL = ['/oauth/token','/objects/api_related_collections/add'];

exports.hasAccess = function(req,res,next) {
    if(BYPASS_FOR_URL.includes(req.path)) { console.log('inside bypass');return next();}
    
    // Authenticate for all the api path excep oauth token generation and login
    authenticate();
    next();
};