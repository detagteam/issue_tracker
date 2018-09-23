
exports.CONSTANTS = {
    dbURL : 'cluster0-shard-00-01-fbnay.mongodb.net',
    dbPost : 20717,
    connectionString : 'mongodb://detag_admin:detag%40User!2018@cluster0-shard-00-00-fbnay.mongodb.net:27017,cluster0-shard-00-01-fbnay.mongodb.net:27017,cluster0-shard-00-02-fbnay.mongodb.net:27017/issue_tracker?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true'
}

exports.MONGOOSE_OPTIONS = {
    
}

exports.PROFILE_ACCESS = {
    "System_Admin":["read","write","delete","modify_all"],
    "System_Manager":["read","write"]
}

exports.API_ACCESS_TYPE={
    "/me":"read"
}

// %40 -> @ and %21 -> !