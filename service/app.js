const CONFIG = require('./config')

const OAUTH_MODEL = require('./model.js')
const express = require('express'),
    oauthserver = require('oauth2-server'),
    clients = require('./client'),
    users = require('./user'),
    mongooose = require('mongoose');

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
        OAUTH_MODEL.model.getClient(req,res);
        res.send({message: "requested for oauth! I am working on this"});
    });

    app.post('/client/fetch',function(req,res){
        let result = clients.fetchClient(connection,req.body);

        res.send({"client": JSON.stringify(result)});
    });
})

app.listen(3000);

