import mongoose from 'mongoose'
import Plan from '../models/Plan.js'
import HttpError from '../utils/http-error.js'
import createBookmarkService from './bookmark-service.js'
import createGenericService from './components/generic-service.js'
import exerciseService from './exercise-service.js'
import userService from './user-service.js'
import workoutService from './workout-service.js'

const planService = createGenericService(Plan)
const bookmarkService = createBookmarkService(Plan)

const getActivePlanId = async (userId) => {
  const activePlanId = (await userService.getById(userId)).activePlan
  if (!activePlanId) {
    throw new HttpError(409, `You don't have an active plan at the moment.`)
  }

  return activePlanId
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

  const notWorkoutIds = workoutIds
    .map((id) => new mongoose.Types.ObjectId(id))
    .filter(
      (id) =>
        !workoutIdsToAdd.some((addedId) => addedId.equals(id)) &&
        !workoutIdsFailed.some((failedId) => failedId.equals(id))
    )

  workoutIdsFailed.push(...notWorkoutIds)

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

planService.removeWorkout = async (planId, workoutId, day) => {
  await planService.getById(planId) // for check, if plan exists

  await planService.update(planId, {
    $pull: { [`workouts.${day}`]: workoutId },
  })
}

planService.getTodaysWorkouts = async (userId) => {
  const activePlan = await planService.getById(await getActivePlanId(userId))

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

  if (activePlan === null) {
    return []
  }

  const workouts = await workoutService.getAll({
    _id: {
      $in: activePlan.workouts[day],
    },
  })

  let result = []

  for (let i = 0; i < workouts.length; i++) {
    const workout = workouts[i]

    result[i] = { ...workout._doc }
    result[i].exercises = []

    for (let j = 0; j < workout.exercises.length; j++) {
      const exercise = workout.exercises[j]
      const fullExercise = await exerciseService.getById(exercise.exerciseId)

      result[i].exercises[j] = {
        ...fullExercise._doc,
        sets: exercise.sets,
        restSecondsBetweenSets: exercise.restSecondsBetweenSets,
        notes: exercise.notes,
      }
    }
  }

  return result
}

export default planService
