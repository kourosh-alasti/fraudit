import { getFrauditInformation } from './getFrauditInformation'
import { getAdminStatus } from '../user.query'

export const getFrauditOwnerStatus = async (frauditId, userId) => {
  const fraudit = getFrauditInformation(frauditId)

  if (fraudit.ownerId !== userId) {
    // TODO: ERROR HANDLER
    throw new Error('You are not the owner of this fraudit')
  }

  return {
    isOwner: fraudit.ownerId === userId || getAdminStatus(userId)
  }
}
