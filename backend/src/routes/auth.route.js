const express = require('express')
const {
  register,
  login,
  logout,
  passwordReset,
  passwordRequest
} = require('../controllers/auth.controller')

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.post('/request-reset', passwordRequest)
router.post('/password-reset', passwordReset)

module.exports = router
