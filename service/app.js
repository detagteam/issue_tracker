const CONFIG = require('./config')
const OAUTH_MODEL = require('./model.js')
const express = require('express'),
    oauthserver = require('oauth2-server'),
    clients = require('./client'),
    users = require('./user'),
    mongooose = require('mongoose');


const Request = OAuth2Server.Request;
const Response = OAuth2Server.Response;

var app = express();
app.use(express.json());
app.use(express.urlencoded());

mongooose.connect(CONFIG.CONSTANTS.connectionString)
var connection = mongooose.connection

// setting parameters to oauth2
let oauth = new oauthserver({
    model: OAUTH_MODEL.model,
    grants : ['password'],
    debug: true
});

//promise returns
connection.on('error',console.error.bind(console,"connection error: "))
connection.on('open',function(){
    OAUTH_MODEL.model.connection = connection;
    console.log('Connected');
    app.post('/client/add',function(req, res){
        console.log(req);
        // res.send({"message":"working"});
        clients.postClients(req,res);
    });

    app.post('/user/add',function(req, res){
        console.log(req);
        // res.send({"message":"working"});
        users.postUsers(req,res);
    });

    app.post('/oauth/token',function(req,res){
        let options = {
            accessTokenLifetime=3600,
            refreshTokenLifetime=1209600,
            alwaysIssueNewRefreshToken=true
        };
        let request = new Request(req);
        let response = new Response(res);
        return oauth.token(request, response, options)
        .then(function(code) {
            res.locals.oauth = {token: token};
            next();
        })
        .catch(function(err) {
            // handle error condition
            res.send({"error":"Invalid/Bad request received"});
        });
    });

    app.post('/client/fetch',function(req,res){
        let result = clients.fetchClient(connection,req.body);

        res.send({"client": JSON.stringify(result)});
    });

    // oauth.authenticate(req.res).then((token)=>{
    //     // the request is successfully authenciated by the token
    // }).catch((err)=>{
    //     // the request has failed as per the authentication
    // });
})

app.listen(3000);