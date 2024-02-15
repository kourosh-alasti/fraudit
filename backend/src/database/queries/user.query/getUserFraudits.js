// const User = require('../../../models/user.model')
const Member = require('../../../models/member.model')
const Fraudit = require('../../../models/fraudit.model')
const { getUserInformation } = require('./getUserInformation')

const getUserFraudits = async (id) => {
  const user = await getUserInformation(id)

  if (!user) {
    // TODO: Error Handling
    throw new Error('User does not exist')
  }

  const members = await Member.find({ userId: id })

  const fraudits = members.map(async (member) => {
    return await Fraudit.find({ id: member.frauditId })
  })

  return fraudits

  // TODO: NEED REST
}

module.exports = getUserFraudits
