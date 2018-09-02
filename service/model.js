const mongoose = require('mongoose')
const token = require('./token')

exports.model = {
    connection : {},
    getAccessToken: function() {
      return 'works!';
    },
    getAuthorizationCode: function() {
      return 'works!';
    },
    getClient: function(clientId, clientSecret) {
      let params = {
        client_id: clientId
      };
      if(clientSecret) {
        params.client_secret = clientSecret;
      }
      this.connection.db.collection('Client', function(err, collection){
          collection.find(params).toArray(function(err, result) {
              if (err) throw err;
              console.log('### getClient ###');
              console.log(result);
              return {
                id: result[0].client_id,
                grants: ['password']
              };
          });
      });
      return 'Not Found';
    },
    getUser: function(username, password) {
      let params = {
        username: username,
        password: password
      };
      this.connection.db.collection('User',function(err, collection){
        collection.find(params).then(function(err,result){
          if(err) throw err;
          return result[0];
        });
      });
      return 'works!';
    },
    saveToken: function(token, client, user) {
      accessToken = token.saveAccessToken(connection,token.accessToken,token.accessTokenExpiresAt,token.scope,client.id,user._id);
      refreshToken = token.saveRefreshToken(connection,token.refreshToken,token.refreshTokenExpiresAt,token.scope,client.id,user._id);
      
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