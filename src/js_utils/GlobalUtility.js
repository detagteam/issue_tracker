const fs = require("fs");

var GlobalUtility = {};

GlobalUtility.getFileContent = function(calloutMethod,filePath, callback) {
    var provideContentData = fs.readFile(filePath,callback);
};

GlobalUtility.sendError = function(res) {
    res.writeHead(404);
    res.write('Not found!');
}

module.exports = GlobalUtility;