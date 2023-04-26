const {
    MongoClient
} = require("mongodb");
const errHandler = require('../../core/helpers/errHandler')
const {
    STR_MAIN_DB
} = require('../../common/constants')
const {
    MongoMemoryServer
} = require('mongodb-memory-server');

let objMongoConnection
async function createMongoDbConnection() {
    return new Promise(async (resolve, reject)=>{
        /** Start Inmemmory mongodb */
        const mongod = await MongoMemoryServer.create();
        console.log(mongod.getUri());
        /**Create Connections */
        objMongoConnection = await MongoClient.connect(
            mongod.getUri(), {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        );
        console.log("MongoClient Created");
        resolve()
    })
}

async function getMongoDbConnection(strDbName = STR_MAIN_DB) {
    try {
        if (!objMongoConnection)
            await createMongoDbConnection()
        if (strDbName)
            return objMongoConnection.db(strDbName);
        else
            throw new errHandler("DB_NOT_FOUND", "errServer")
    } catch (error) {
        throw new errHandler(error)
    }
}

module.exports = {
    createMongoDbConnection,
    getMongoDbConnection
}