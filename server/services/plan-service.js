import Plan from '../models/Plan.js'
import createGenericService from './components/generic-service.js'
import createBookmarkService from './bookmark-service.js'
import userService from './user-service.js'
import workoutService from './workout-service.js'
import HttpError from '../utils/httpError.js'

const planService = createGenericService(Plan)
const bookmarkService = createBookmarkService(Plan)

const getActivePlanId = async (userId) => {
  return (await userService.getById(userId)).activePlan
}

planService.getActive = async (userId) => {
  const activePlanId = await getActivePlanId(userId)
  if (!activePlanId) {
    return {}
  }

  return planService.getById(activePlanId)
}

planService.setActive = async (planId, userId) => {
  const plan = await planService.getById(planId)

  await userService.update(userId, { activePlan: planId })

  return plan
}

planService.removeActive = async (planId, userId) => {
  const activePlanId = await getActivePlanId(userId)

  if (!activePlanId || !activePlanId.equals(planId)) {
    throw new HttpError(
      400,
      'The plan is not the currently active plan for this user.'
    )
  }

  await userService.update(userId, { activePlan: null })
}

planService.setBookmark = async (planId, userId) => {
  return await bookmarkService.setBookmark(planId, userId)
}

planService.removeBookmark = async (planId, userId) => {
  return await bookmarkService.removeBookmark(planId, userId)
}

planService.getWorkouts = async (planId, day) => {
  const plan = await planService.getById(planId)

  const workoutIds = day ? plan.workouts[day] : plan.workouts

  return await workoutService.getAll({ _id: { $in: workoutIds } })
}

planService.addWorkouts = async (planId, workoutIds, day, userId) => {
  const plan = await planService.getById(planId)

  let workoutIdsToAdd = []
  let workoutIdsFailed = []

  const workoutsToAdd = await workoutService.getAll({
    _id: { $in: workoutIds },
  })

  for (const workout of workoutsToAdd) {
    if (
      !plan.workouts[day].includes(workout._id) &&
      (workout.isPublic || workout.userId.equals(userId))
    ) {
      workoutIdsToAdd.push(workout._id)
    } else {
      workoutIdsFailed.push(workout._id)
    }
  }

  await planService.update(planId, {
    $addToSet: { [`workouts.${day}`]: { $each: workoutIdsToAdd } }, // $addToSet: avoids duplicates
  })

  return {
    added: await workoutService.getAll({
      _id: { $in: workoutIdsToAdd },
    }),
    failed: workoutIdsFailed,
  }
}

planService.removeWorkout = async (planId, workoutId) => {
  const plan = await planService.getById(planId)

  for (const [day, workoutIds] in plan.workouts) {
    if (workoutIds.includes(workoutId)) {
      await planService.update(planId, {
        $pull: { [`workouts.${day}`]: workoutId },
      })
      break
    }
  }
}

planService.getTodaysWorkouts = async (userId) => {
  const activePlan = await getActivePlanId(userId)
  const dayIndex = new Date().getDay() - 1

  const day = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ][dayIndex]

  return await workoutService.getAll(activePlan._id, {
    $in: activePlan.workouts[day],
  })
}

export default planService
