const fs = require("fs");

var GlobalUtility = {};

GlobalUtility.getFileContent = function(filePath, callback) {
    console.log('inside getFileContent');
    var provideContentData = fs.readFile(filePath,callback);
};

GlobalUtility.sendError = function(res) {
    res.writeHead(404);
    res.write('Not found!');
}

GlobalUtility.isPOST = function(method) {
    return (method!==undefined && method==='POST')?true:false;
}

GlobalUtility.isGET = function(method) {
    return (method!==undefined && method==='GET')?true:false;
}

module.exports = GlobalUtility;