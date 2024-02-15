// import User from '../../../models/user.model'
import Member from '../../../models/member.model'
import Fraudit from '../../../models/fraudit.model'
import { getUserInformation } from './getUserInformation'

export const getUserFraudits = async (id) => {
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
