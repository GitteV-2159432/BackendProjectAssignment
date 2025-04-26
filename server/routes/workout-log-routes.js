import express from 'express'
import {
  addWorkoutLog,
  getLatestLog,
  getPastProgress,
} from '../controllers/workout-log-controller.js'
import validate from '../middleware/validation/validation.js'
import createValidation from '../middleware/validation/workout-log/createValidation.js'
import userIdToObjectId from '../middleware/validation/userIdToObjectId.js'
import authMiddleware from '../middleware/auth.js'
import workoutIdToObjectId from '../middleware/validation/workoutIdToObjectId.js'

const router = express.Router()

router.get('/past-progress', authMiddleware, userIdToObjectId, getPastProgress)

router.get(
  '/weekly-count',
  authMiddleware,
  userIdToObjectId,
  workoutIdToObjectId,
  getLatestLog
)

router.post(
  '/',
  authMiddleware,
  // userIdToObjectId,
  [...createValidation(), validate],
  addWorkoutLog
)

export default router
