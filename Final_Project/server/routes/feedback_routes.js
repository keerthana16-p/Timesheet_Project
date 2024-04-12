const express = require('express');
const FeedbackController = require('../controller/feedback_controller');
const router = express.Router();

router.post('/intern', FeedbackController.interncreateFeedback);
router.post('/general', FeedbackController.generalcreateFeedback);
router.post('/consultant',FeedbackController.consultantcreateFeedback);
router.post('/tribemaster',FeedbackController.tribemastercreateFeedback);
router.get('/getdetails/:role/:username',FeedbackController.getdetails);
module.exports = router;
