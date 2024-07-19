const express = require('express');
const { requestService, reportService } = require('../controllers/requestController');

const router = express.Router();

router.post('/request', requestService);
router.post('/report', reportService);

module.exports = router;
