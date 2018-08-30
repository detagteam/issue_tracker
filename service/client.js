const Client = require("../models/client");

// for saving clients for method type POST
function postClients(req, res) {
    // Create a new instance of the Client model
    var client = new Client();
  
    // Set the client properties that came from the POST data
    console.log(req.body);
    client.name = req.body.name;
    client.client_id = req.body.client_id;
    client.client_secret = req.body.client_secret;
    client.userId = req.body.userId;
    client.profile = req.body.profile;
  
    console.log(client);

    client.save(function(err) {
    if (err)
        res.send(err);
  
    res.json({ message: 'Client added to the database!', data: client });
    });
}

function fetchClient(connection,params) {
    connection.db.collection('Client',function(err,collection){
        if(err) throw err;

        collection.find(params).toArray(function(err,result){
            if(err) throw err;
            console.log('fetchClient');
            // console.log(JSON.stringify(result));
            return result;
        });
    });
}

module.exports = {
    postClients: postClients,
    fetchClient: fetchClient
};