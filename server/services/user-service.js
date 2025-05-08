import User from '../models/User.js'
import HttpError from '../utils/http-error.js'
import createGenericService from './components/generic-service.js'

const userService = createGenericService(User)

userService.checkPermission = async (currentUserId, userId = null) => {
  const currentUser = await userService.getById(currentUserId)

  // Check if the user is an admin or the owner of the resource
  if (userId && !currentUserId.equals(userId) && currentUser.type !== 'admin') {
    throw new HttpError(403, 'Permission denied.')
  }

  // If userId is not provided, check if the current user is an admin
  if (!userId && currentUser.type !== 'admin') {
    throw new HttpError(403, 'Admin permission required.')
  }
}

export default userService
