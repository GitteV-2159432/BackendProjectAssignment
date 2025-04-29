import Plan from '../models/Plan.js'
import createGenericService from './components/generic-service.js'
import createBookmarkService from './bookmark-service.js'
import userService from './user-service.js'
import HttpError from '../utils/httpError.js'

const planService = createGenericService(Plan)
const bookmarkService = createBookmarkService(Plan)

planService.getActive = async (userId) => {
  const activePlanId = await getActivePlanId(userId)
  if (!activePlanId) {
    return {}
  }

  return planService.getById(activePlanId)
}

planService.setActive = async (planId, userId) => {
  const plan = await planService.getByIdWithPermissionCheck(planId, userId)

  await userService.update(userId, { activePlan: planId })

  return plan
}

planService.removeActive = async (planId, userId) => {
  await planService.getByIdWithPermissionCheck(planId, userId)

  const activePlanId = await getActivePlanId(userId)

  if (!activePlanId || !activePlanId.equals(planId)) {
    throw new HttpError(
      400,
      'The plan is not the currently active plan for this user.'
    )
  }

  await userService.update(userId, { activePlan: null })
}

planService.getByIdWithPermissionCheck = async (planId, userId) => {
  const plan = await planService.getById(planId)

  if (!plan.isPublic && !plan.userId.equals(userId)) {
    throw new HttpError(
      403,
      'You do not have permission to activate this plan.'
    )
  }

  return plan
}

planService.setBookmark = async (planId, userId) => {
  return await bookmarkService.setBookmark(planId, userId)
}

planService.removeBookmark = async (planId, userId) => {
  return await bookmarkService.removeBookmark(planId, userId)
}

const getActivePlanId = async (userId) => {
  return (await userService.getById(userId)).activePlan
}

export default planService
