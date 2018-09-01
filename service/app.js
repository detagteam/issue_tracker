const CONFIG = require('./config')

const express = require('express'),
    OAUTH_MODEL = require('./models/oauth'),
    oauthserver = require('oauth2-server'),
    clients = require('./models/client'),
    users = require('./models/user'),
    mongooose = require('mongoose'),
    bodyParser = require('body-parser');

const Request = oauthserver.Request,
      Response = oauthserver.Response;

var app = express();

let oauth = new oauthserver({
    model: OAUTH_MODEL.model,
    grants : ['password','refresh_token'],
    debug: true
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// app.use(app.oauth.authorize())


mongooose.connect(CONFIG.CONSTANTS.connectionString)
var connection = mongooose.connection

// setting parameters to oauth2





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

    // app.post('/oauth/token',function(req,res){
    //     return oauth.token(req,res)
    //     //res.send({message: "requested for oauth! I am working on this"});
    // });
    app.all('/oauth/token', function(req,res,next){
        var request = new Request(req);
        var response = new Response(res);
        
        oauth
          .token(request,response)
          .then(function(token) {
            // Todo: remove unnecessary values in response
            return res.json(token)
          }).catch(function(err){
            return res.status(500).json(err)
          })
      });

   

    app.post('/client/fetch',function(req,res){
        let result = clients.fetchClient(connection,req.body);

        res.send({"client": JSON.stringify(result)});
    });
})

app.listen(3000);

