import express from 'express'
import { testLogger, test } from '../controllers/test.controller'

const router = express.Router()

router.get('/test', test)
router.post('/test', testLogger)

export default router
