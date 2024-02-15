const express = require('express')
const {
  createFraudit,
  deleteFraudit
} = require('../controllers/fraudit.controller')

const router = express.Router()

router.post('/create', createFraudit)
router.delete('/delete/:frauditId', deleteFraudit)

module.exports = router
