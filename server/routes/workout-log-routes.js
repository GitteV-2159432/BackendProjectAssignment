import express from 'express'
import {
  addWorkoutLog,
  getLatestLog,
  getPastProgress,
} from '../controllers/workout-log-controller.js'
import validate from '../middleware/validation/validation.js'
import createValidation from '../middleware/validation/workout-log/create-validation.js'
import authMiddleware from '../middleware/auth.js'
import objectIdValidation from '../middleware/validation/object-id-validation.js'
import userIdToObjectId from '../middleware/validation/user-id-to-object-id.js'

const router = express.Router()

router.get(
  '/weekly-count',
  authMiddleware,
  userIdToObjectId,
  [...objectIdValidation('workoutId'), validate],
  getPastProgress
)

router.get(
  '/latest-log',
  authMiddleware,
  userIdToObjectId,
  [...objectIdValidation('workoutId'), validate],
  getLatestLog
)

router.post(
  '/',
  authMiddleware,
  userIdToObjectId,
  [...createValidation(), validate],
  addWorkoutLog
)

export default router
