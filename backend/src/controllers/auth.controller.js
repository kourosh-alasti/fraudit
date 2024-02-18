const User = require('../models/user.model')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { error } = require('../utils/consoler')

//* WORKS
const register = async (req, res, next) => {
  /*
   * GRABS USER INFORMATION FROM FORM
   */
  const { username, email, password, fname, lname } = req.body

  /*
   * VALIDATES USER INFORMATION IN BACKEND POST-FRONTEND VALIDATION
   */
  if (
    !username ||
    !email ||
    !password ||
    !fname ||
    username === '' ||
    email === '' ||
    password === '' ||
    fname === ''
  ) {
    // ERROR HANDLER
    next()
  }

  /*
   * HASHES PASSWORD
   */
  const hashedPassword = bcryptjs.hashSync(password, 10)

  /*
   * CREATES NEW USER
   */
  const newUser = new User({
    username,
    email,
    first_name: fname,
    last_name: lname === '' ? '' : lname,
    password: hashedPassword,
    idAdmin: false
  })

  try {
    /*
     * SAVES NEW USER TO COLLECTION
     * RETURNS 201 STATUS CODE FOR SUCCESS and JSON MESSAGE
     */
    await newUser.save()
    res.status(201).json('Registration Successful!')
  } catch (err) {
    next(err)
  }
}

//* WORKS
const login = async (req, res, next) => {
  /*
   * PULLS USERNAME AND PASSWORD FROM FORM
   */
  const { username, password } = req.body

  /*
   * VALIDATES ACCOUNT INFORMATION
   */
  if (!username || !password || username === '' || password === '') {
    // ERROR HANDLER
    next()
  }

  try {
    /*
     * PULL USER INFORMATION FROM DB BY USERNAME
     * CHECKS IF ENTERED PASSWORD MATCHES HASHED PASSWORD
     */
    const user = await User.findOne({ username }).exec()
    const isValidPassword = bcryptjs.compareSync(password, user.password)

    /*
     * CHECKS IF VALID USER
     */
    if (!user) {
      // ERROR HANDLER
      return next()
    }

    /*
     * CHECKS IF ENTERED PASSWORD IS VALID
     */
    if (!isValidPassword) {
      // ERROR HANDLER
      return next()
    }

    /*
     * CREATES JWT TOKEN FOR COOKIES
     */
    const jwToken = jwt.sign({ id: user._id }, process.env.DEV_JWT_SECRET)

    /*
     * PULLS PASSWORD OUT OF REST OF USER DATA
     */
    const { password: pass, ...rest } = user._doc

    /*
     * RETURNS 200 STATUS FOR OK and ADDS JWT TOKEN TO COOKIE AND RETURNS USER OBJECT W/O PASSWORD
     */
    res
      .status(200)
      .cookie('access_token', jwToken, { httpOnly: true })
      .json(rest)
  } catch (err) {
    error(err)
    next(err)
  }
}

//* WORKS
const logout = (req, res, next) => {
  try {
    /*
     * Clear Browser Cookie with stored JWT Auth TOKEN
     * Return JSON Message and 200 Status Code for Success
     */
    res.clearCookie('access_token').status(200).json('You have been logged out')
  } catch (err) {
    next(err)
  }
}

module.exports.register = register
module.exports.login = login
module.exports.logout = logout
