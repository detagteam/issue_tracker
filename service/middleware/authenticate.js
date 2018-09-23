const mongoose = require('mongoose'),
      oauthServer = require('oauth2-server'),
      oauth = require('../components/oauthDriver'),
      config = require('../config'),
      Request = oauthServer.Request,
      Response = oauthServer.Response; 

module.exports = function(options) {
    var options = options || {};
    return function(req,res,next) {
        console.log(req.headers.authorization);
        var request = new Request({
            headers : {authorization : req.headers.authorization},
            method : req.method,
            query : req.query,
            body : req.body
        })

        var response = new Response(res);

        oauth.authenticate(request,response,options)
            .then(function(data) {
                req.user = data.user
                console.log('Authentication complete for profile :: ' + req.user.profile)
                if(config.API_ACCESS_TYPE!==undefined && config.API_ACCESS_TYPE[req.path]!==undefined) {
                    var access = config.API_ACCESS_TYPE[req.path];
                    var permissions = config.PROFILE_ACCESS;
                    if(permissions[req.user.profile]!==undefined && 
                        permissions[req.user.profile].includes(access))
                        next();
                    else
                        next('Dont have enough access');
                }

                // next()
            })
            .catch(function(err){
                console.log('err')
                res.status(err.code || 500).json(err)
            });
    }
}