const express = require('express')
const {
  createFraudit,
  deleteFraudit
} = require('../controllers/fraudit.controller')

const router = express.Router()

router.post('/create', createFraudit)
router.delete('/delete/:id', deleteFraudit)

module.exports = router
