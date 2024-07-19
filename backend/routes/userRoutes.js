const express = require('express');
const { getAllUsers, getUserById, getMe } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.get('/me', authMiddleware, getMe);

module.exports = router;
