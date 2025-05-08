import express from 'express'
import {
  bookmarkExercise,
  deleteExercise,
  getExercise,
  getExercises,
  unbookmarkExercise,
  updateExercise,
} from '../controllers/exercise-controller.js'
import validateUpdate from '../middleware/validation/exercise/update-validation.js'
import validateObjectId from '../middleware/validation/object-id-validation.js'
import { validateGetAllExercisesQueryParams } from '../middleware/validation/query-param-validation.js'
import userIdToObjectId from '../middleware/validation/user-id-to-object-id.js'
import validate from '../middleware/validation/validation.js'

const router = express.Router()

router.get(
  '/',
  userIdToObjectId,
  [...validateGetAllExercisesQueryParams(), validate],
  getExercises
)

router.get(
  '/:id',
  userIdToObjectId,
  [validateObjectId('id'), validate],
  getExercise
)

router.post(
  '/:id/bookmark',
  userIdToObjectId,
  [validateObjectId('id'), validate],
  bookmarkExercise
)

router.delete(
  '/:id/bookmark',
  userIdToObjectId,
  [validateObjectId('id'), validate],
  unbookmarkExercise
)

router.delete(
  '/:id',
  userIdToObjectId,
  [validateObjectId('id'), validate],
  deleteExercise
)

router.patch(
  '/:id',
  userIdToObjectId,
  [...validateUpdate(), validate],
  updateExercise
)

export default router
