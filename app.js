const gConstants = require("./src/js_utils/GlobalConstants");
const gu = require("./src/js_utils/GlobalUtility");

const http = require("http");
const fs = require("fs");
const express = require("express");

const app = express();

var self = this;
http.createServer((req, res) => {
    if(gConstants.METHOD_ON_PAGE_ALLOWED[req.url]!==undefined && gConstants.METHOD_ON_PAGE_ALLOWED[req.url].indexOf(req.method)<0) {
        gu.sendError(res);
        res.end();
    } else if(gConstants.URL_PATH_MAP[req.url]!==undefined) {
        gu.getFileContent(req.method,gConstants.BASE_PATH+gConstants.URL_PATH_MAP[req.url],function(err, data) {
            if(!err) {
                res.writeHead(200,{'Content-Type':'text/html'});
                res.write(data);
            } else {
                gu.sendError(res);
            }
            res.end();
        });
    }
    // res.write(req.url + ' ' + gu.getFileContent('./src/components/index/index.html'));
}).listen(gConstants.LISTENING_PORT);
