const rbacSchema = require('../schema/rbac');

exports.model = rbacSchema;

exports.postRBAC = function(req,res) {
    let rbacEntry = new rbacSchema();
    rbacEntry.name = req.body.name;
    rbacEntry.hasAccessOf = req.body.hasAccessOf;
    rbacEntry.inherit = req.body.inherit;

    rbacEntry.save(function(err) {
        if(err)
            res.send(err);
        res.json({message:'Role based access sharing created successfully', data:rbacEntry});
    });
};