const mongoose = require('mongoose')
const token = require('./token')
const client = require('./client')
const user = require('./user')
const connection = mongoose.connection


exports.model = {
    connection : {},
    getAccessToken: function(bearerToken) {
      return token.model.findOne({accessToken : bearerToken}).lean()
    },
    getRefreshToken : function(bearerToken) {
      return token.model.findOne({refreshToken : bearerToken}).lean()
    },
    getClient: function(clientId, clientSecret) {
      return client.model.findOne({
        clientId: clientId,
        clientSecret : clientSecret
      }).lean()
    },
    getUser: function(username, password) {
      return user.model.findOne({
        username: username,
        password : password
      }).lean();
    },

    /*

    saveToken : function(token, client, user) {
      var accessToken = new token({
        accessToken: token.accessToken,
        accessTokenExpiresOn: token.accessTokenExpiresOn,
        client : client,
        clientId: client.clientId,
        refreshToken: token.refreshToken,
        refreshTokenExpiresOn: token.refreshTokenExpiresOn,
        user : user,
        userId: user._id,
      });
      // Can't just chain `lean()` to `save()` as we did with `findOne()` elsewhere. Instead we use `Promise` to resolve the data.
      return new Promise( function(resolve,reject){
        accessToken.save(function(err,data){
          if( err ) reject( err );
          else resolve( data );
        }) ;
      }).then(function(saveResult){
        // `saveResult` is mongoose wrapper object, not doc itself. Calling `toJSON()` returns the doc.
        saveResult = saveResult && typeof saveResult == 'object' ? saveResult.toJSON() : saveResult;
        
        // Unsure what else points to `saveResult` in oauth2-server, making copy to be safe
        var data = new Object();
        for( var prop in saveResult ) data[prop] = saveResult[prop];
        
        // /oauth-server/lib/models/token-model.js complains if missing `client` and `user`. Creating missing properties.
        data.client = data.clientId;
        data.user = data.userId;
    
        return data;
      });
    },

    */


    getAuthorizationCode: function() {
      return 'works!';
    },
    
    saveAuthorizationCode : function() {
      console.log("Called")
    },

    
    saveToken: function(receivedToken, client, user) {
      accessToken = token.saveAccessToken(connection,receivedToken.accessToken,receivedToken.accessTokenExpiresAt,receivedToken.scope,client.id,user._id);
      refreshToken = token.saveRefreshToken(connection,receivedToken.refreshToken,receivedToken.refreshTokenExpiresAt,receivedToken.scope,client.id,user._id);
      
      return {
        accessToken: accessToken.accessToken,
        accessTokenExpiresAt: accessToken.expiresAt,
        refreshToken: refreshToken.refreshToken,
        refreshTokenExpiresAt: refreshToken.expiresAt,
        scope: accessToken.scope,
        client: {id: accessToken.clientId},
        user: {id: accessToken.userId}
      }
    }
};
