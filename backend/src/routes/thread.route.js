const express = require('express')
const { verifyToken } = require('../utils/auth')
const {
  createThread,
  getThreads,
  deleteThread,
  updateThread
} = require('../controllers/thread.controller')

const router = express.Router()

router.post('/create', verifyToken, createThread)
router.get('/:threadId', getThreads)
router.delete('/delete/:threadId', verifyToken, deleteThread)
router.put('/update/:threadId', verifyToken, updateThread)

module.exports = router
