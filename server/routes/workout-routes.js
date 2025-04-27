import express from 'express'
import mongoose from 'mongoose'
import { param, query } from 'express-validator'

import {
  addWorkout,
  getWorkout,
  getWorkouts,
} from '../controllers/workout-controller.js'
import userIdToObjectId from '../middleware/validation/user-id-to-object-id.js'
import validate from '../middleware/validation/validation.js'

const router = express.Router()

router.get('/', userIdToObjectId, getWorkouts)

router.get(
  '/:id',
  [
    param('id').customSanitizer(
      (val) => new mongoose.Types.ObjectId(String(val))
    ),
    validate,
  ],
  getWorkout
)

router.post('/', addWorkout)

export default router
