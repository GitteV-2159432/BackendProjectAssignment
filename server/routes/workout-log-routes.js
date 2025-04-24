import express from 'express'
import {
  addWorkoutLog,
  getLatestLog,
  getPastProgress,
} from '../controllers/workout-log-controller.js'
import validate from '../middleware/validation/validation.js'
import objectIdValidation from '../middleware/validation/objectIdValidation.js'
import createValidation from '../middleware/validation/workout-log/createValidation.js'

const router = express.Router()

router.get(
  '/past-progress',
  [...objectIdValidation('userId'), validate],
  getPastProgress
)

router.get(
  '/latest-log',
  [
    ...objectIdValidation('userId'),
    ...objectIdValidation('workoutId'),
    validate,
  ],
  getLatestLog
)

router.post('/', [...createValidation(), validate], addWorkoutLog)

export default router
