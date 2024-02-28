const bcryptjs = require('bcryptjs')
const User = require('../models/user.model')
const { getUserInformation } = require('../database/queries/user.query')

//* WORKS
const getUser = async (req, res, next) => {
  try {
    /*
     * PULLS USER FROM BUCKET BY ID FROM REQUEST
     */
    const user = await User.findById(req.params.userId)

    /*
     * RETURNS ERROR IF USER DOESNT EXIST
     */
    if (!user) {
      // TODO: ERROR HANDLING
      return next()
    }

    /*
     * GRABS PASSWORD AND OBJECT DATA FROM USER
     */
    const { password, ...rest } = user._doc

    /*
     * RETURN STATUS CODE 200 FOR OK AND USER DATA AS JSON
     */
    res.status(200).json(rest)
  } catch (err) {
    // ERROR HANDLING
    next(err)
  }
}

//* WORKS
const getUsers = async (req, res, next) => {
  /*
   * CHECKS IF USER HAS ADMIN PRIVILEGES
   */
  if (!req.isAdmin) {
    // TODO: ERROR HANDLER
    res.status(403).json({
      message: 'Access Denied, only Site Admins can access this information'
    })

    return next()
  }

  try {
    /*
     * Grab Start Index if given as a request
     * Grab Limit to number of users given
     * Grab Sort Direction from request
     */
    const startIndex = parseInt(req.query.startIndex) || 0
    const limit = parseInt(req.query.limit) || 9
    const sortDirection = req.query.slot === 'asc' ? 1 : -1

    /*
     * Pull users from start index -> limit with sorted by sorthDirection var
     *
     */
    const users = await User.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit)

    /*
     * Creates array of users and removes passwords from user objects
     */
    const usersWithoutPassword = users.map((user) => {
      const { password, ...rest } = user._doc
      return rest
    })

    /*
     * Takes Count of all Users in collections
     */
    const totalUsers = await User.countDocuments()
    // const now = new Date();

    // const oneMonthAgo = new Date(
    //   now.getFullYear(),
    //   now.getMonth() - 1,
    //   now.getDate()
    // );

    /*
     * Array of users that created their account in the last month
     */
    // const lastMonthUsers = await User.countDocuments({
    //   createdAt: { $gte: oneMonthAgo },
    // });

    /*
     * Returns status 200 for success
     * Returns users as JSON object
     */
    res.status(200).json({
      users: usersWithoutPassword,
      totalUsers
      // lastMonthUsers,
    })
  } catch (err) {
    next(err)
  }
}

//* WORKS
const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId && !req.isAdmin) {
    // TODO: ERROR HANDLER
    res
      .status(403)
      .json({ message: 'Access Denied. Only an Admin can delete accounts' })

    return next()
  }

  try {
    await User.findByIdAndDelete(req.params.userId)
    res.status(200).json({ message: 'Your account has been deleted' })
  } catch (err) {
    next(err)
  }
}

//* WORKS
const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId && !req.isAdmin) {
    // TODO: ERROR HANDLER
    res
      .status(403)
      .json({ message: "Access Denied. Can't update other accounts" })
    return next()
  }

  if (req.body.password) {
    if (req.body.password < 6) {
      // TODO: ERROR HANDLER
      return next()
    }

    req.body.password = bcryptjs.hashSync(req.body.password, 10)
  }

  if (req.body.username) {
    if (req.body.username.length < 7 || req.body.username.length > 20) {
      // TODO: ERROR HANDLER
      return next()
    }

    if (req.body.username.includes(' ')) {
      // TODO: ERROR HANDLER
      return next()
    }

    if (req.body.username !== req.body.username.toLowerCase()) {
      // TODO: ERROR HANDLER
      return next()
    }

    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      // TODO: ERROR HANDLER
      return next()
    }
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          profilePicture: req.body.profilePicture,
          password: req.body.password
        }
      },
      { new: true }
    )

    const { password, ...rest } = updatedUser._doc
    res.status(200).json(rest)
  } catch (err) {
    next(err)
  }
}

//* WORKS
const updateUserAdmin = async (req, res, next) => {
  if (!req.isAdmin) {
    // TODO: ERROR HANDLER
    res
      .status(403)
      .json({
        message: 'Access Denied. Do Not have permission to update admin status'
      })

    return next()
  }

  const user = await getUserInformation(req.params.userId)

  if (!user) {
    // TODO: ERROR HANDLER
    return next()
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          isAdmin: !user.isAdmin
        }
      },
      { new: true }
    )

    const { password, ...rest } = updatedUser._doc
    res.status(200).json(rest)
  } catch (err) {
    next(err)
  }
}

module.exports.getUser = getUser
module.exports.getUsers = getUsers
module.exports.deleteUser = deleteUser
module.exports.updateUser = updateUser
module.exports.updateUserAdmin = updateUserAdmin
