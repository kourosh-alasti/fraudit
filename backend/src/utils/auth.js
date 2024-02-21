const jwt = require('jsonwebtoken')
const { getUserInformation } = require('../database/queries/user.query/')
const { debug, warn, error } = require('./consoler')

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

module.exports.verifyToken = verifyToken
module.exports.verifyIsAdmin = verifyIsAdmin
