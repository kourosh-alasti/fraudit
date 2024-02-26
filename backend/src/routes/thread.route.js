const express = require('express')
const { verifyToken } = require('../utils/auth')
const {
  createThread,
  getThread,
  getThreads,
  deleteThread,
  updateThread
} = require('../controllers/thread.controller')

const router = express.Router()

router.post('/', verifyToken, createThread)
router.get('/', getThread)
router.get('/:threadId', getThreads)
router.delete('/:threadId', verifyToken, deleteThread)
router.patch('/:threadId', verifyToken, updateThread)

module.exports = router
