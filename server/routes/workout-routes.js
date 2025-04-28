import express from 'express'

import {
  addWorkout,
  getWorkout,
  getWorkouts,
} from '../controllers/workout-controller.js'
import userIdToObjectId from '../middleware/validation/user-id-to-object-id.js'

const router = express.Router()

router.get('/', userIdToObjectId, getWorkouts)

router.get('/:id', getWorkout)

router.post('/', addWorkout)

export default router
