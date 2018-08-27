// custom libraries
const gConstants = require("./GlobalConstants");
const gu = require("./GlobalUtility");

// standard libraries
const express = require("express");

const app = express();

var AppRouter = function(){
    return {
        route: function(req, res){
            if(req.method==='GET'){
                console.log('## AppRouter' + req.method);
                console.log(req.url);
                console.log('app:: ' + app);
                app.get(req.url,function(req, res){
                    res.send('hello world');
                    console.log('inside app get');
                    if(gConstants.URL_PATH_MAP[req.url]!==undefined){
                        gu.getFileContent(gConstants.BASE_PATH+gConstants.URL_PATH_MAP[req.url],function(err, data) {
                            if(!err) {
                                res.writeHead(200,{'Content-Type':'text/html'});
                                res.write(data);
                            } else {
                                gu.sendError(res);
                            }
                            res.end();
                        });
                    }
                });
            } else if(gu.isPOST(req.method)){
                console.log('## AppRouter: ' + req.method);
                app.post(req.url,function(req, res){
                    if(gConstants.URL_PATH_MAP[req.url]!==undefined){
                        gu.getFileContent(gConstants.BASE_PATH+gConstants.URL_PATH_MAP[req.url],function(err, data) {
                            if(!err) {
                                res.writeHead(200,{'Content-Type':'text/html'});
                                res.write(data);
                            } else {
                                gu.sendError(res);
                            }
                            res.end();
                        });
                    }
                });
            }
        }
    };
};

module.exports = AppRouter;