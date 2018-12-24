const mongoose = require('mongoose'),
      oauthServer = require('oauth2-server'),
      oauth = require('../components/oauthDriver'),
      Request = oauthServer.Request,
      Response = oauthServer.Response; 

module.exports = function(options) {
    var options = options || {};
    return function(req,res,next) {
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
                next()
            })
            .catch(function(err){
                console.log(err)
                res.status(err.code || 500).json(err)
            });
    }
}