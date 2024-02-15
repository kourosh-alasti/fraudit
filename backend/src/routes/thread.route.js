import express from 'express'
import { verifyToken } from '../utils/auth'
import {
  createThread,
  getThreads,
  deleteThread,
  updateThread
} from '../controllers/thread.controller'

const router = express.Router()

router.post('/create', verifyToken, createThread)
router.get('/:threadId', getThreads)
router.delete('/delete/:threadId', verifyToken, deleteThread)
router.put('/update/:threadId', verifyToken, updateThread)

export default router
