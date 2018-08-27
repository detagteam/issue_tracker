//custom libraries
const gConstants = require("./src/js_utils/GlobalConstants");
const gu = require("./src/js_utils/GlobalUtility");
const AppRouter = require("./src/js_utils/AppRouter");

// standard libraries
const http = require("http");
const express = require("express");
const path = require("path");

const appRouter = AppRouter();
const app = express();
const htmlPath = '/src/components';

// var self = this;
// http.createServer((req, res) => {
//     appRouter.route(req, res);
//     // res.write(req.url + ' ' + gu.getFileContent('./src/components/index/index.html'));
// }).listen(gConstants.LISTENING_PORT);
// appRouter.route(req,res);

// app.listen(7777,()=>console.log("App is running on 7777 port"));

for(let urlPath in gConstants.URL_PATH_MAP) {
    app.get(urlPath,(req,res)=>{
        if(gConstants.URL_PATH_MAP[req.url]!==undefined){
            res.sendFile(path.join(__dirname+htmlPath+gConstants.URL_PATH_MAP[req.url]));
        } else {
            res.send('404! File not found');
        }
    });
}

// app.get('/index',(req,res)=>{
//     if(gConstants.URL_PATH_MAP[req.url]!==undefined){
//         res.sendFile(path.join(__dirname+htmlPath+gConstants.URL_PATH_MAP[req.url]));
//     } else {
//         res.send('404! File not found');
//     }
// });

// app.get('/',(req,res)=>{
//     if(gConstants.URL_PATH_MAP[req.url]!==undefined){
//         res.sendFile(path.join(__dirname+htmlPath+gConstants.URL_PATH_MAP[req.url]));
//     } else {
//         res.send('404! File not found');
//     }
// });
console.log(__dirname+htmlPath);
app.listen(gConstants.LISTENING_PORT, () => {
    console.log('Example app listening on port 7777!')
});