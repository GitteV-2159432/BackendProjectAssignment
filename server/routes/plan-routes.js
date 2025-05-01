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
  getTodaysWorkouts,
} from '../controllers/plan-controller.js'
import userIdToObjectId from '../middleware/validation/user-id-to-object-id.js'
import validateObjectId from '../middleware/validation/object-id-validation.js'
import validate from '../middleware/validation/validation.js'
import {
  validateDayQueryParam,
  validateGetAllFilterQueryParam,
} from '../middleware/validation/query-param-validation.js'
import validateCreate from '../middleware/validation/workout-and-plan/create-validation.js'
import validateUpdate from '../middleware/validation/workout-and-plan/update-validation.js'
import planService from '../services/plan-service.js'

const router = express.Router()

const checkObjectPermission = (readAccess = false) => {
  return async (req, res, next) => {
    await planService.checkPermission(
      req.params.id,
      req.userObjectId,
      readAccess
    )
    next()
  }
}

router.get('/active', getActivePlan)

router.post(
  '/:id/mark-active',
  [validateObjectId('id'), validate],
  checkObjectPermission(true),
  setActivePlan
)

router.delete(
  '/:id/mark-active',
  [validateObjectId('id'), validate],
  removeActivePlan
)

router.post('/:id/bookmark', [validateObjectId('id'), validate], bookmarkPlan)

router.delete(
  '/:id/bookmark',
  [validateObjectId('id'), validate],
  unbookmarkPlan
)

router.get('/', [validateGetAllFilterQueryParam(), validate], getPlans)

router.get(
  '/:id',
  [validateObjectId('id'), validate],
  checkObjectPermission(true),
  getPlan
)

router.post('/', [...validateCreate(), validate], addPlan)

router.patch('/:id', [...validateUpdate(), validate], updatePlan)

router.delete(
  '/:id',
  [validateObjectId('id'), validate],
  checkObjectPermission(),
  deletePlan
)

router.get(
  '/:id/workouts',
  [validateObjectId('id'), validateDayQueryParam(false), validate],
  checkObjectPermission(true),
  getWorkouts
)

router.post(
  '/:id/workouts',
  [validateObjectId('id'), validateDayQueryParam(true), validate],
  checkObjectPermission(),
  addWorkouts
)

router.delete(
  '/:id/workouts/:idDel',
  [validateObjectId('id'), validateObjectId('idDel'), validate],
  checkObjectPermission(),
  removeWorkout
)

router.get(
  '/:id/workouts/today',
  [validateObjectId('id'), validate],
  getTodaysWorkouts
)

export default router
