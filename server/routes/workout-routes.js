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
  unbookmarkWorkout,
} from '../controllers/workout-controller.js'
import userIdToObjectId from '../middleware/validation/user-id-to-object-id.js'
import validateObjectId from '../middleware/validation/object-id-validation.js'
import validate from '../middleware/validation/validation.js'
import validateCreate from '../middleware/validation/workout-and-plan/create-validation.js'
import validateUpdate from '../middleware/validation/workout-and-plan/update-validation.js'
import workoutService from '../services/workout-service.js'
import validateExercise from '../middleware/validation/workout-and-plan/exercise-validation.js'

const router = express.Router()

const checkObjectPermission = async (req, res, next) => {
  await workoutService.checkPermission(req.params.id, req.userObjectId)
  next()
}

router.get('/', userIdToObjectId, getWorkouts)

router.get(
  '/:id',
  userIdToObjectId,
  [validateObjectId('id'), validate],
  checkObjectPermission,
  getWorkout
)

router.post('/', userIdToObjectId, [...validateCreate(), validate], addWorkout)

router.patch(
  '/:id',
  userIdToObjectId,
  [...validateUpdate(), validate],
  checkObjectPermission,
  addWorkout
)

router.delete(
  '/:id',
  userIdToObjectId,
  [validateObjectId('id'), validate],
  checkObjectPermission,
  deleteWorkout
)

router.post(
  '/:id/bookmark',
  userIdToObjectId,
  [validateObjectId('id'), validate],
  checkObjectPermission,
  bookmarkWorkout
)

router.delete(
  '/:id/bookmark',
  userIdToObjectId,
  [validateObjectId('id'), validate],
  checkObjectPermission,
  unbookmarkWorkout
)

router.get(
  '/:id/exercises',
  userIdToObjectId,
  [validateObjectId('id'), validate],
  checkObjectPermission,
  getWorkoutExercises
)

router.post(
  '/:id/exercises',
  userIdToObjectId,
  [...validateExercise(), validate],
  checkObjectPermission,
  addWorkoutExercises
)

router.delete(
  '/:id/exercises/:idDel',
  userIdToObjectId,
  [validateObjectId('id'), validateObjectId('idDel'), validate],
  checkObjectPermission,
  deleteWorkoutExercise
)

export default router
