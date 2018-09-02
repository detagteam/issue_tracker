const CONFIG = require('./config')

var mongooose = require('mongoose')

mongooose.connect(CONFIG.CONSTANTS.connectionString)
const connection = mongooose.connection

//promise returns
connection.on('error',console.error.bind(console,"connection error: "))
connection.on('open',function(){
    console.log('Connected')
})

