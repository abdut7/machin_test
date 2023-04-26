const {
    getMongoDbConnection
} = require('../../core/helpers')
const errHandler = require('../../core/helpers/errHandler')
const {
    ObjectID
} = require('mongodb')


async function findAll({
    strCollection,
    objQuery = {},
    sort = {}
}) {
    try {
        const objConnection = await getMongoDbConnection()
        return objConnection.collection(strCollection).find(objQuery).sort(sort).toArray()
    } catch (error) {
        throw new errHandler(error)
    }
}

async function findOne({
    strCollection,
    objQuery,
    sort = {}
}) {
    try {
        const objConnection = await getMongoDbConnection()
        return objConnection.collection(strCollection).findOne(objQuery, {}, sort)
    } catch (error) {
        console.log(error);
        throw new errHandler(error)
    }
}

async function inserMany({
    strCollection,
    arrInsertDocuments
}) {
    try {
        const objConnection = await getMongoDbConnection()
        await objConnection.collection(strCollection).insertMany(arrInsertDocuments)
        return {
            "strMessage": "Success"
        }
    } catch (error) {
        throw new errHandler(error)
    }
}

async function insertOne({
    objDocument,
    strCollection
}) {
    try {
        const objConnection = await getMongoDbConnection()
        return objConnection.collection(strCollection).insertOne(objDocument)
    } catch (error) {
        throw new errHandler(error)
    }
}

async function updateOneKey({
    objMatch,
    objSetCart,
    strCollection
}) {
    const objConnection = await getMongoDbConnection()
    try {
        await objConnection.collection(strCollection).findOneAndUpdate(objMatch, objSetCart)
        return {
            "strMessage": "UPDATE_SUCCESS"
        }
    } catch (error) {
        throw new errHandler(error)
    }
}

async function deleteDB({
    strCollection,
    arrDeleteId,
    strModifiedTime,
    strModifiedUser
}) {
    const objConnection = await getMongoDbConnection()
    try {
        let arrOldItem = await objConnection.collection(strCollection).find({
            "_id": {
                $in: arrDeleteId
            }
        }).toArray()
        if (arrOldItem.length != arrDeleteId.length) {
            throw new errHandler("ITEM_MISMACTH")
        }
        // await createDataLog({
        //     objConnection,
        //     arrOldItem,
        //     strUserId: strModifiedUser,
        //     strCreatedTime: strModifiedTime
        // })
        await objConnection.collection(strCollection).updateMany({
            "_id": {
                $in: arrDeleteId
            }
        }, {
            $set: {
                "chrStatus": "D",
                strModifiedTime,
                strModifiedUser
            }
        })
        return {}
    } catch (error) {
        throw new errHandler(error)
    }
}

module.exports = {
    findAll,
    findOne,
    inserMany,
    insertOne,
    updateOneKey,
    deleteDB,
}