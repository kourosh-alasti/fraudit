const express = require('express')
const { deleteUser, getUser, getUsers, logout, updateUser} = require('../controllers/user.controller')
const {verifyToken } = require('../utils/auth')

const router = express.Router()

router.put('/update/:userId', verifyToken, updateUser);
router.delete('/delete/:userId', verifyToken, deleteUser);
router.post('/logout', logout);
router.get('/getusers', verifyToken, getUsers);
router.get('/:userId', getUser);

module.exports = router;

