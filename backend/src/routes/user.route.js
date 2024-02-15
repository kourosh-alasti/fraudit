import express from 'express'

import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
  updateUserAdmin
} from '../controllers/user.controller'

import { verifyToken, verifyIsAdmin } from '../utils/auth'

const router = express.Router()

router.put('/update/:userId', verifyToken, updateUser)
router.put('/admin/:userId', verifyToken, verifyIsAdmin, updateUserAdmin)
router.delete('/delete/:userId', verifyToken, deleteUser)
router.post('/logout', logout)
router.get('/getusers', verifyToken, verifyIsAdmin, getUsers)
router.get('/:userId', verifyToken, getUser)

export default router
