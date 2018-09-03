const OAuthError = require('oauth2-server/lib/errors/oauth-error');

let error = new OAuthError();

exports.setError = function(err,statusCode, status, code, message,name) {
    error.statusCode = statusCode || '401';
    error.status = status || '401';
    error.code = code || '401';
    error.message = message || err.message;
    error.name = name || err.name;
    return error;
};