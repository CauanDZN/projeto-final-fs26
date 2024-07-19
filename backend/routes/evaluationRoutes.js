const express = require('express');
const { evaluateClass } = require('../controllers/evaluationController');

const router = express.Router();

router.post('/evaluate', evaluateClass);

module.exports = router;
