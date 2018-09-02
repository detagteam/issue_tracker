const Token = require("../schema/token");

exports.model = Token
exports.saveAccessToken = function(connection,accessToken,expiresAt,scope,clientId,userId) {
    var token = new Token();

    token.accessToken = accessToken;
    token.expiresAt = expiresAt;
    token.scope = scope;
    token.client = clientId;
    token.user = userId;

    console.log('AccessToken');
    console.log(token);

    token.save(function(err) {
        if (err)
            throw err;
        
        console.log('AccessTokenSaved!!');
        console.log(JSON.stringify(token));
        return token;
    });
    return token;
  };

  exports.saveRefreshToken = function(connection,refreshToken,expiresAt,scope,clientId,userId) {
    var token = new Token();

    token.refreshToken = refreshToken;
    token.expiresAt = expiresAt;
    token.scope = scope;
    token.client = clientId;
    token.user = userId;

    console.log('RefreshToken');
    console.log(token);

    token.save(function(err) {
    if (err)
        throw err;

        console.log('RefreshTokenSaved!!');
        console.log(JSON.stringify(token));
        return token;
    });
    return token;
  };

 