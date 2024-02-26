const express = require('express')
const { testLogger, test } = require('../controllers/test.controller')

const router = express.Router()

router.get('/test', test)
router.post('/test', testLogger)

module.exports = router
