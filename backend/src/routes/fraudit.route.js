const express = require('express')
const {
  createFraudit,
  deleteFraudit
} = require('../controllers/fraudit.controller')

const router = express.Router()

router.post('/', createFraudit)
router.delete('/:frauditId', deleteFraudit)

module.exports = router
