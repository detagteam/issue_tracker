const mongoose = require('mongoose');

let rbac = new mongoose.Schema({
    name: {type: String, required: true, unique:true},
    hasAccessOf: {type: mongoose.Schema.Types.Mixed,required: true},
    inherit: {type: String}
});

module.exports = mongoose.model('Profile',rbac,'profiles');