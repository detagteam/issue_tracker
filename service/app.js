const CONFIG = require('./config')

const express = require('express'),
    oauthserver = require('oauth2-server'),
    oauth = require('./components/oauthDriver'),
    authenticate = require('./middleware/authenticate')
    clients = require('./models/client'),
    users = require('./models/user'),
    apiRelCols = require('./models/api_collection_map'),
    createRbac = require('./models/rbac'),
    mongooose = require('mongoose'),
    bodyParser = require('body-parser'),
    oauthError = require('./models/oauth_error.js'),
    rbac = require('./middleware/rbac');

const Request = oauthserver.Request,
      Response = oauthserver.Response;

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(rbac.hasAccess);

mongooose.connect(CONFIG.CONSTANTS.connectionString)
var connection = mongooose.connection

//promise returns
connection.on('error',console.error.bind(console,"connection error: "))
connection.on('open',function(){

    // OAUTH_MODEL.model.connection = connection;
    console.log('Connected');
    app.post('/objects/client/add',function(req, res){
        clients.postClients(req,res);
    });

    app.post('/objects/user/add',function(req, res){
        console.log(req);
        users.postUsers(req,res);
    });

    app.post('/objects/api_related_collections/add',function(req, res){
        apiRelCols.postApiCollectionMap(req,res);
    });

    app.post('/objects/rbac/add',function(req, res){
        createRbac.postRBAC(req,res);
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

    app.post('/objects/client/fetch',function(req,res){
        let result = clients.fetchClient(connection,req.body);

        res.send({"client": JSON.stringify(result)});
    });
})


app.listen(process.env.PORT || 3000);

