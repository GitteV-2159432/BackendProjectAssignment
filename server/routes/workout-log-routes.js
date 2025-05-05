import express from 'express'

import {
  addWorkoutLog,
  getLatestLog,
  getPastProgress,
} from '../controllers/workout-log-controller.js'
import validateObjectId from '../middleware/validation/object-id-validation.js'
import validate from '../middleware/validation/validation.js'
import createValidation from '../middleware/validation/workout-log/create-validation.js'

const router = express.Router()

router.get(
  '/weekly-count',
  [validateObjectId('workoutId'), validate],
  getPastProgress
)

router.get(
  '/latest-log',
  [validateObjectId('workoutId'), validate],
  getLatestLog
)

router.post('/', createValidation(), validate, addWorkoutLog)

export default router
