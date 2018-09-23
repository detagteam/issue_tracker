const mongoose = require("mongoose");

let apiCollections = new mongoose.Schema({
    uri: {type: String, required: true, unique: true},
    collections: {type:[String]},
    accessType: {type:String, required:true}
});

module.exports = mongoose.model('APICollectionMap',apiCollections,'apiCollectionsMap');