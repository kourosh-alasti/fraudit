const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
const Token = require('../models/token.model')
const { getUserInformation } = require('../database/queries/user.query/')
const { debug, warn, error } = require('./consoler')
const bcryptjs = require('bcryptjs')
const crypto = require('crypto')
const { sendEmail } = require('../utils/email/sendEmail')

const verifyToken = (req, res, next) => {
  warn('Verifying Token')
  /*
   *  PULLS JWT TOKEN FROM COOKIES
   */
  const token = req.cookies.access_token
  debug(`ACCESS TOKEN: ${token}`)

  /*
   * CHECKS IF TOKEN EXISTS
   */
  if (!token) {
    // TODO: ERROR HANDLER
    warn('Token does not exist')
    return next()
  }

  /*
   * VERIFIES TOKEN AND SETS REQ.USER
   */
  jwt.verify(token, process.env.DEV_JWT_SECRET, (err, user) => {
    debug('Verifying token')
    if (err) {
      // TODO: ERROR HANDLER
      error('Error while trying to verify Token')
      return next()
    }

    debug('Setting User')
    console.log(user)
    req.user = user
    next()
  })
}

const verifyIsAdmin = async (req, res, next) => {
  const userId = req.user.id
  debug(`USER ID: ${userId} `)

  const userInfo = await getUserInformation(userId)

  if (!userInfo.isAdmin) {
    warn('Not an admin')
    req.isAdmin = false
    next()
  }

  debug('Is Admin')
  req.isAdmin = true
  next()
}

const requestResetPassword = async (email) => {
  const user = await User.findOne({ email })

  if (!user) {
    throw new Error('User does not exist')
  }

  const token = await Token.findOne({ userId: user._id })

  if (token) {
    await token.deleteOne()
  }

  const newResetToken = crypto.randomBytes(32).toString('hex')
  const hashedToken = await bcryptjs.hash(newResetToken, 10)

  await new Token({
    userId: user._id,
    token: hashedToken,
    createdAt: Date.now()
  }).save()

  const link = `${process.env.DEV_CLIENT_URL}/api/v1/auth/password-reset?token=${newResetToken}&id=${user._id}`
  sendEmail(
    user.email,
    'Password Reset Request',
    {
      name: user.name,
      link
    },
    './template/requestResetPassword'
  )

  return link
}

const resetPassword = async (userId, token, password) => {
  const pwdResetToken = await Token.findOne({ userId })
  if (!pwdResetToken) {
    throw new Error('Invalid or Expired Token')
  }

  const isValidToken = await bcryptjs.compare(token, pwdResetToken.token)
  if (!isValidToken) {
    throw new Error('Inalid or Expired Token')
  }

  const hashedPassword = await bcryptjs.hash(password, 10)
  await User.updateOne(
    { _id: userId },
    { $set: { password: hashedPassword } },
    { new: true }
  )

  const user = User.findById({ _id: userId })

  sendEmail(
    user.email,
    'Password Reset Successfully',
    { name: user.first_name },
    './template/resetPassword.handlebars'
  )

  await pwdResetToken.deleteOne()

  return true
}

module.exports.verifyToken = verifyToken
module.exports.verifyIsAdmin = verifyIsAdmin
module.exports.requestResetPassword = requestResetPassword
module.exports.resetPassword = resetPassword
