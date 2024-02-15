import jwt from 'jsonwebtoken'
import { getUserInformation } from '../database/queries/user.query'

export const verifyToken = (req, res, next) => {
  /*
   *  PULLS JWT TOKEN FROM COOKIES
   */
  const token = req.cookies.access_token

  /*
   * CHECKS IF TOKEN EXISTS
   */
  if (!token) {
    // TODO: ERROR HANDLER
    return next()
  }

  /*
   * VERIFIES TOKEN AND SETS REQ.USER
   */
  jwt.verify(token, process.env.DEV_JWT_SECRET, (err, user) => {
    if (err) {
      // TODO: ERROR HANDLER
      return next()
    }

    req.user = user
    next()
  })
}

export const verifyIsAdmin = async (req, res, next) => {
  const userId = req.user.id

  const userInfo = await getUserInformation(userId)

  if (!userInfo.isAdmin) {
    req.isAdmin = false
    next()
  }

  req.isAdmin = true
  next()
}
