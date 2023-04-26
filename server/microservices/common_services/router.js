const express = require("express");
const {
    makeController
} = require("../../libs/core/helpers");
const {
    getQuestensController,
    createQuestensController,
    createAnswerController,
    getFeedbackController
} = require("../../libs/feedback");
const router = express.Router();
router.get("/get_questens", makeController(getQuestensController));
router.post("/create_questens", makeController(createQuestensController));
router.post("/feedback",makeController(createAnswerController))
router.get("/get_feedback", makeController(getFeedbackController));
module.exports = router;