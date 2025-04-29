import express from 'express'
import {
  addPlan,
  deletePlan,
  getPlan,
  getPlans,
  updatePlan,
  getActivePlan,
  setActivePlan,
  removeActivePlan,
  bookmarkPlan,
  unbookmarkPlan,
  getWorkouts,
  addWorkouts,
  removeWorkout,
  getTodaysWorkout,
} from '../controllers/plan-controller.js'
import userIdToObjectId from '../middleware/validation/user-id-to-object-id.js'
import validateObjectId from '../middleware/validation/object-id-validation.js'
import validate from '../middleware/validation/validation.js'
import {
  validateDayQueryParam,
  validateGetAllQueryParams,
} from '../middleware/validation/query-param-validation.js'
import validateCreate from '../middleware/validation/workout-and-plan/create-validation.js'
import validateUpdate from '../middleware/validation/workout-and-plan/update-validation.js'

const router = express.Router()

router.get('/active', userIdToObjectId, getActivePlan)

router.post(
  '/:id/mark-active',
  userIdToObjectId,
  [validateObjectId('id'), validate],
  setActivePlan
)

router.delete(
  '/:id/mark-active',
  userIdToObjectId,
  [validateObjectId('id'), validate],
  removeActivePlan
)

router.post(
  '/:id/bookmark',
  userIdToObjectId,
  [validateObjectId('id'), validate],
  bookmarkPlan
)

router.delete(
  '/:id/bookmark',
  userIdToObjectId,
  [validateObjectId('id'), validate],
  unbookmarkPlan
)

router.get(
  '/',
  userIdToObjectId,
  [...validateGetAllQueryParams(), validate],
  getPlans
)

router.get(
  '/:id',
  userIdToObjectId,
  [validateObjectId('id'), validate],
  getPlan
)

router.post('/', userIdToObjectId, [...validateCreate(), validate], addPlan)

router.patch(
  '/:id',
  userIdToObjectId,
  [...validateUpdate(), validate],
  updatePlan
)

router.delete(
  '/:id',
  userIdToObjectId,
  [validateObjectId('id'), validate],
  deletePlan
)

router.get(
  '/:id/workouts',
  userIdToObjectId,
  [validateObjectId('id'), validate],
  getWorkouts
)

router.post(
  '/:id/workouts',
  userIdToObjectId,
  [validateObjectId('id'), validateDayQueryParam, validate],
  addWorkouts
)

router.delete('/:id/workouts/:id', removeWorkout)

router.get('/:id/workouts/today', getTodaysWorkout)

export default router
