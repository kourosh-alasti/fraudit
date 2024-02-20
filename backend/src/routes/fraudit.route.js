const express = require('express')
const {
  createFraudit,
  deleteFraudit,
  getFraudit,
  getFraudits,
  updateFraudits
} = require('../controllers/fraudit.controller')

const router = express.Router()

router.post('/', createFraudit)
router.delete('/:frauditId', deleteFraudit)
router.patch('/:frauditId', updateFraudits)
router.get('/:frauditId', getFraudit)
router.get('/')

module.exports = router
