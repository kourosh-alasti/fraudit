const express = require('express')
const {
  deleteUser,
  getUser,
  getUsers,
  logout,
  updateUser,
  updateUserAdmin
} = require('../controllers/user.controller')
const { verifyToken, verifyIsAdmin } = require('../utils/auth')

const router = express.Router()

router.put('/update/:userId', verifyToken, updateUser)
router.put('/admin/:userId', verifyToken, verifyIsAdmin, updateUserAdmin)
router.delete('/delete/:userId', verifyToken, deleteUser)
router.post('/logout', logout)
router.get('/getusers', verifyToken, verifyIsAdmin, getUsers)
router.get('/:userId', verifyToken, getUser)

module.exports = router
