const {
    errHandler,
    // setRedisData
} = require('../../core/helpers')
const {
    insertOne,
    findAll,
    inserMany,
    findOne
} = require('../../common/functions/query')
const getQuestens = async ({
    source,
    body
}) => {
    try {
        const arrList = await findAll({
            strCollection: "cln_questens",
            sort: {
                "intSlNo": 1
            }
        })
        return {
            arrList
        }
    } catch (error) {
        throw new errHandler(error).set({})
    }
}

const createAnswer = async ({
    source,
    body
}) => {
    if (!body["arrList"] || !body["arrList"].length) {
        throw new errHandler("Data missing").set({})
    }

    /**Find latest customerID */

    const lastAns = await findOne({
        strCollection: "cln_feedback",
        sort: {
            "customerId": -1
        }
    })
    console.log("lastAns", lastAns);
    const arrAns = body["arrList"].map(item => ({
        ...item,
        customerId: (lastAns && lastAns.customerId + 1) || 1
    }))
    console.log(arrAns);
    const result = await inserMany({
        arrInsertDocuments: arrAns,
        strCollection: "cln_feedback"
    });

    if (result)
        return {
            "strMessage": "Successfully created"
        }
    else
        throw new errHandler("Failed").set({})
}

const createQuestens = async ({
    source,
    body
}) => {
    if (!body["strQuesten"] || !body["intSlNo"]) {
        throw new errHandler("Data missing").set({})
    }

    const result = await insertOne({
        objDocument: {
            "strQuesten": body["strQuesten"],
            intSlNo: body["intSlNo"]
        },
        strCollection: "cln_questens"
    });

    if (result)
        return {
            "strMessage": "Successfully created"
        }
    else
        throw new errHandler("Failed").set({})
}


const getFeedback = async ({
    source,
    body
}) => {
    try {
        let objQuery = {}
        if (body["customerId"])
            objQuery = {
                customerId: body["customerId"]
            }
        const arrList = await findAll({
            objQuery,
            strCollection: "cln_feedback",
            sort: {
                "intSlNo": 1
            }
        })
        return {
            arrList
        }
    } catch (error) {
        throw new errHandler(error).set({})
    }
}

module.exports = {
    getQuestens,
    createAnswer,
    createQuestens,
    getFeedback
}