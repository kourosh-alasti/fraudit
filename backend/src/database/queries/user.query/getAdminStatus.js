// import User from '../../../models/user.model'
import getUserInformation from './getUserInformation'

export const getAdminStatus = async (id) => {
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
