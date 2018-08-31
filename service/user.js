const User = require("../models/user");

// for saving users for method type POST
exports.postUsers = function(req, res) {
    // Create a new instance of the User model
    var user = new User();
  
    // Set the User properties that came from the POST data
    console.log(req.body);
    user.name = req.body.name;
    user.username = req.body.username;
    user.password = req.body.password;
    user.profile = req.body.profile;
  
    console.log(user);

    user.save(function(err) {
    if (err)
        res.send(err);
  
    res.json({ message: 'Users added to the database!', data: user });
    });
  };
