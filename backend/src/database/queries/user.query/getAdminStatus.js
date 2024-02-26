// const User = require('../../../models/user.model')
const getUserInformation = require('./getUserInformation')

const getAdminStatus = async (id) => {
  const user = await getUserInformation(id)

  if (!user.isAdmin) {
    return {
      username: user.username,
      isAdmin: false
    }
  }

  return {
    username: user.username,
    isAdmin: true
  }
}

module.exports = getAdminStatus
