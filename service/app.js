const CONFIG = require('./config')

const express = require('express'),
    oauthserver = require('oauth2-server'),
    oauth = require('./components/oauthDriver'),
    authenticate = require('./middleware/authenticate')
    clients = require('./models/client'),
    users = require('./models/user'),
    mongooose = require('mongoose'),
    bodyParser = require('body-parser'),
    oauthError = require('./models/oauth_error.js');

const Request = oauthserver.Request,
      Response = oauthserver.Response;

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

mongooose.connect(CONFIG.CONSTANTS.connectionString)
var connection = mongooose.connection

//promise returns
connection.on('error',console.error.bind(console,"connection error: "))
connection.on('open',function(){

    // OAUTH_MODEL.model.connection = connection;
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

    app.post('/oauth/token', function(req,res,next){
        var request = new Request(req);
        var response = new Response(res);

        oauth
          .token(request,response)
          .then(function(token) {
            // Todo: remove unnecessary values in response
            return res.json(token)
          }).catch(function(err){
            // return res.status(500).json(err);
            return res.status(500).json(oauthError.setError(err))
          })
      });

    app.all('/me',authenticate(),function(req,res){
        res.json({
            profile : req.user
        })
    });

    app.post('/client/fetch',function(req,res){
        let result = clients.fetchClient(connection,req.body);

        res.send({"client": JSON.stringify(result)});
    });
})


app.listen(process.env.PORT || 3000);

