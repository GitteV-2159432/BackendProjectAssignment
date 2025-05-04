import userService from '../services/user-service.js'
import planService from '../services/plan-service.js'

const getQueryFromFilterParameters = async (filter, userId) => {
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

const mapModelDTO = async (documents, modelName, userId) => {
  let bookmarkedIds = (await userService.getById(userId)).bookmarks[modelName]

  return documents.map((doc) => {
    return {
      ...doc._doc,
      bookmarked: bookmarkedIds.includes(doc._id),
    }
  })
}

const mapPlanDTO = async (documents, userId) => {
  const activePlanId = (await planService.getActive(userId))._id

  return documents.map((doc) => {
    return {
      ...doc._doc,
      isActive: doc._id.equals(activePlanId),
    }
  })
}

export { getQueryFromFilterParameters, mapModelDTO, mapPlanDTO }
