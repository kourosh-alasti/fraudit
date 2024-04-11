const User = require('../../../models/user.model')

const getUserByUsername = async (username) => {
  const user = await User.findOne({ username }).exec()

  if (!user) {
    throw new Error('User with that username does not exist')
  }

  return user
}

module.exports = getUserByUsername
