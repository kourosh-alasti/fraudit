import Member from '../../../models/member.model'

export const getMembers = async (id) => {
  const members = await Member.find({ frauditId: id })

  if (!members) {
    // TODO: ERROR HANDLING
    throw new Error('No SubFraudit exists with this ID')
  }

  return members
}
