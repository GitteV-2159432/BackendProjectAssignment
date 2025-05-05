import express from 'express'

import {
  addWorkout,
  addWorkoutExercises,
  bookmarkWorkout,
  deleteWorkout,
  deleteWorkoutExercise,
  getWorkout,
  getWorkoutExercises,
  getWorkouts,
  patchWorkout,
  unbookmarkWorkout,
} from '../controllers/workout-controller.js'
import validateObjectId from '../middleware/validation/object-id-validation.js'
import { validateGetAllFilterQueryParam } from '../middleware/validation/query-param-validation.js'
import userIdToObjectId from '../middleware/validation/user-id-to-object-id.js'
import validate from '../middleware/validation/validation.js'
import validateCreate from '../middleware/validation/workout-and-plan/create-validation.js'
import validateExercise from '../middleware/validation/workout-and-plan/exercise-validation.js'
import validateUpdate from '../middleware/validation/workout-and-plan/update-validation.js'
import workoutService from '../services/workout-service.js'

const router = express.Router()

const checkObjectPermission = (readAccess = false) => {
  return async (req, res, next) => {
    await workoutService.checkPermission(
      req.params.id,
      req.userObjectId,
      readAccess
    )
    next()
  }
}

router.get('/', [validateGetAllFilterQueryParam(), validate], getWorkouts)

router.get(
  '/:id',
  [validateObjectId('id'), validate],
  checkObjectPermission(true),
  getWorkout
)

router.post('/', userIdToObjectId, [...validateCreate(), validate], addWorkout)

router.patch(
  '/:id',
  [...validateUpdate(), validate],
  checkObjectPermission(),
  patchWorkout
)

router.delete(
  '/:id',
  [validateObjectId('id'), validate],
  checkObjectPermission(),
  deleteWorkout
)

router.post(
  '/:id/bookmark',
  [validateObjectId('id'), validate],
  checkObjectPermission(true),
  bookmarkWorkout
)

router.delete(
  '/:id/bookmark',
  [validateObjectId('id'), validate],
  checkObjectPermission(true),
  unbookmarkWorkout
)

router.get(
  '/:id/exercises',
  [validateObjectId('id'), validate],
  checkObjectPermission(true),
  getWorkoutExercises
)

router.post(
  '/:id/exercises',
  [...validateExercise(), validate],
  checkObjectPermission(),
  addWorkoutExercises
)

router.delete(
  '/:id/exercises/:idDel',
  [validateObjectId('id'), validateObjectId('idDel'), validate],
  checkObjectPermission(),
  deleteWorkoutExercise
)

export default router
