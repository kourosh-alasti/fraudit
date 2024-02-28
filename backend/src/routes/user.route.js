const express = require('express')
const {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
  updateUserAdmin
} = require('../controllers/user.controller')
const { verifyToken, verifyIsAdmin } = require('../utils/auth')

const router = express.Router()

router.get('/', verifyToken, verifyIsAdmin, getUsers)
router.get('/:userId', verifyToken, getUser)
router.delete('/:userId', verifyToken, deleteUser)
router.patch('/:userId', verifyToken, updateUser)
router.patch('/admin/:userId', verifyToken, verifyIsAdmin, updateUserAdmin)

module.exports = router
