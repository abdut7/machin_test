const {
    arrQuestens
} = require('../../common/constants')
const {
    inserMany
} = require("../../common/functions/query")

const initQuestens = async () => {
    await inserMany({
        strCollection: "cln_questens",
        arrInsertDocuments: arrQuestens
    })
}

module.exports = {
    initQuestens
}