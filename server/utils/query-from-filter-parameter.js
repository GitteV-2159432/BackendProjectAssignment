import userService from '../services/user-service.js'

const queryFromFilterParameters = async (filter, userId) => {
  let query = {}

  switch (filter) {
    case 'personal':
      query.userId = userId
      break

    case 'bookmarked':
      const user = await userService.getById(userId)
      query._id = { $in: user.bookmarks?.workouts || [] }
      break

    default: // 'public'
      query.isPublic = true
      query.userId = { $ne: userId }
      break
  }

  return query
}

export default queryFromFilterParameters
