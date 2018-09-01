var app = require('./app')
var user = require('./models/user')
var client = require('./models/client')

user.model.create({
    username : "admin",
    name : "Admin User",
    password : "pass1234"
},function(){
    client.model.create({
        clientId: "web",
        clientSecret: "secret1234",
        clientName : "Website"
    },function(){
        process.exit()
    })
});