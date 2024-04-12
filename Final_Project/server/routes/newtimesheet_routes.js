const express = require('express');
const router = express.Router();
const timesheetController = require('../controller/newtimesheet_controller');

router.post('/storedata/:responseEmail', timesheetController.storedata);
router.get('/details/:email/:startDate/:endDate', timesheetController.getTimesheetDetails);
module.exports = router;