const apiCollectionMap = require('../schema/api_related_collections');

exports.model = apiCollectionMap;

exports.postApiCollectionMap = function(req,res) {
    console.log(req.body)
    let apiColMapEntry = new apiCollectionMap();
    apiColMapEntry.uri = req.body.uri;
    apiColMapEntry.collections = req.body.collections;
    apiColMapEntry.accessType = req.body.accessType;

    apiColMapEntry.save(function(err) {
        if(err)
            res.send(err);
        res.json({message:'API Collection Map created successfully', data:apiColMapEntry});
    });
};

exports.getApiCollectionMap = function(req,res) {

};