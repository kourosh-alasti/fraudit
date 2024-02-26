const { getFrauditInformation } = require('./getFrauditInformation')
const { getAdminStatus } = require('../user.query')

const getFrauditOwnerStatus = async (frauditId, userId) => {
  const fraudit = getFrauditInformation(frauditId)

  if (fraudit.ownerId !== userId) {
    // TODO: ERROR HANDLER
    throw new Error('You are not the owner of this fraudit')
  }

  return {
    isOwner: fraudit.ownerId === userId || getAdminStatus(userId)
  }
}

module.exports = getFrauditOwnerStatus
