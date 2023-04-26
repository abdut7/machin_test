const makeController = require('./controller');
const {
    getMongoDbConnection,
    createMongoDbConnection
} = require('./DBconnection');
const errHandler = require("./errHandler")

module.exports = {
    makeController,
    getMongoDbConnection,
    createMongoDbConnection,
    errHandler
}