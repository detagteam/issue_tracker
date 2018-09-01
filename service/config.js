
exports.CONSTANTS = {
    dbURL : 'cluster0-shard-00-01-fbnay.mongodb.net',
    dbPost : 20717,
    //connectionString : 'mongodb+srv://detag_admin:detag%40User%212018@cluster0-shard-00-01-fbnay.mongodb.net/issue_tracker'
    connectionString : 'mongodb://detag_admin:detag%40User!2018@cluster0-shard-00-00-fbnay.mongodb.net:27017,cluster0-shard-00-01-fbnay.mongodb.net:27017,cluster0-shard-00-02-fbnay.mongodb.net:27017/issue_tracker?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true'
}

exports.MONGOOSE_OPTIONS = {
    
}

// %40 -> @ and %21 -> !