const {
    getQuestens,
    createQuestens,
    createAnswer,
    getFeedback
} = require("./usecase")
const {
    errHandler
} = require('../core/helpers')
//const scripts = require('../core/scripts')

const getQuestensController = async function ({
    body,
    ...source
}) {
    try {
        return {
            body: await getQuestens({
                source,
                body
            })
        };
    } catch (error) {
        throw new errHandler(error).set()
    }
}


const createQuestensController = async function ({
    body,
    ...source
}) {
    try {
        return {
            body: await createQuestens({
                source,
                body
            })
        };
    } catch (error) {
        throw new errHandler(error).set()
    }
}



const createAnswerController = async function ({
    body,
    ...source
}) {
    try {
        return {
            body: await createAnswer({
                source,
                body
            })
        };
    } catch (error) {
        throw new errHandler(error).set()
    }
}

const getFeedbackController = async function ({
    body,
    ...source
}) {
    try {
        return {
            body: await getFeedback({
                source,
                body
            })
        };
    } catch (error) {
        throw new errHandler(error).set()
    }
}

module.exports = {
    getQuestensController,
    createQuestensController,
    createAnswerController,
    getFeedbackController
}