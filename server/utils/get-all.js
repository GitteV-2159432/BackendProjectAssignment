import planService from '../services/plan-service.js'
import userService from '../services/user-service.js'

/**
 * Builds a MongoDB query object based on filter and document type.
 *
 * @param {'personal' | 'bookmarked' | 'public'} filter - The filter type.
 * @param {string} userId - The ID of the current user.
 * @param {'workouts' | 'plans' | 'exercises'} [documentType='workouts'] - The document type to filter (default is 'workouts').
 * @returns {Promise<Object>} The constructed MongoDB query object.
 */

const getQueryFromFilterParameters = async (
  filter,
  userId,
  documentType = 'workouts'
) => {
  let query = {}

  if (documentType === 'exercises' && filter !== 'bookmarked') {
    return query
  }

  switch (filter) {
    case 'personal':
      query.userId = userId
      break

    case 'bookmarked':
      const user = await userService.getById(userId)
      query._id = { $in: user.bookmarks?.[documentType] || [] }
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
