const express = require('express');
const { verifyToken } = require('../utils/auth');
const { createThread, getThreads, deleteThread, updateThread } = require('../controllers/thread.controller');

const router = express.Router();

router.post('/create', verifyToken, createThread);
router.get('/get', getThreads );
router.delete('/delete/:threadId/:userId', verifyToken, deleteThread)
router.put('/update/:threadId/:userId', verifyToken, updateThread)

module.exports = router;