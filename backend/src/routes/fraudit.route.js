import express from 'express'
import { createFraudit, deleteFraudit } from '../controllers/fraudit.controller'

const router = express.Router()

router.post('/create', createFraudit)
router.delete('/delete/:frauditId', deleteFraudit)

export default router
