const mongoose = require('mongoose')
const token = require('./token')
const client = require('./client')
const user = require('./user')
const connection = mongoose.connection


exports.model = {
    connection : {},

    /** 
     * Called when authenticating a request using bearer token
    */
    getAccessToken: function(bearerToken) {
      console.log("inside getAccessToken");
      return token.model.findOne({accessToken : bearerToken}).populate('user').populate('client').lean().then(function(data){
        if (!data) {
          return false;
        }
        return {
          accessToken: data.accessToken,
          accessTokenExpiresAt: data.expiresAt,
          scope: data.scope,
          user : data.user
        }
        // return data
      })
    },

    /*
      Called during refresh token generation and then call passed on to save token
    */
    getRefreshToken : function(bearerToken) {
      console.log("inside getRefreshToken");
      let retrivedToken =  token.model.findOne({refreshToken : bearerToken}).populate('client').populate('user').lean()
      return retrivedToken.then(function(data){
        if (!data) {
          return false;
        }
        return JSON.parse(JSON.stringify(data))
      })
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
    getAuthorizationCode: function() {
      return 'works!';
    },
    
    saveAuthorizationCode : function() {
      console.log("Called")
    },

    /*
      Called only during accessToken and refreshtoken generation
    */
    
    saveToken: function(receivedToken, client, user) {
      if (!receivedToken){
        return false;
      }
      accessToken = token.saveAccessToken(connection,receivedToken.accessToken,receivedToken.accessTokenExpiresAt,receivedToken.scope,client._id,user._id);
      refreshToken = token.saveRefreshToken(connection,receivedToken.refreshToken,receivedToken.refreshTokenExpiresAt,receivedToken.scope,client._id,user._id);
      
      return {
        accessToken: accessToken.accessToken,
        accessTokenExpiresAt: accessToken.expiresAt,
        refreshToken: refreshToken.refreshToken,
        refreshTokenExpiresAt: refreshToken.expiresAt,
        scope: accessToken.scope,
        client: {clientId:client.clientId},
        user: {username:user.username}
      }
    },
    revokeToken : function(receivedToken)
    {
      return token.model.deleteOne({
        refreshToken : receivedToken
      })
    }
};