import User from '../models/User.js'
import createGenericService from './components/generic-service.js'
import HttpError from '../utils/httpError.js'

const userService = createGenericService(User)

userService.checkPermission = async (currentUserId, userId = null) => {
    const currentUser = await userService.getById(currentUserId)
  
    if (userId && !currentUserId.equals(userId) && currentUser.type !== 'admin') {
      throw new HttpError(403, 'Permission denied.')
    }
  
    if (!userId && currentUser.type !== 'admin') {
      throw new HttpError(403, 'Admin permission required.')
    }
}

export default userService
