import express from 'express'

import exerciseRoutes from './exercise-routes.js'
import planRoutes from './plan-routes.js'
import workoutLogRoutes from './workout-log-routes.js'
import workoutRoutes from './workout-routes.js'
import authRoutes from './auth.js'
import userRoutes from './user-routes.js'
import authMiddleware from '../middleware/auth.js'

const router = express.Router()

router.use('/exercises', authMiddleware, exerciseRoutes)
router.use('/plans', authMiddleware, planRoutes)
router.use('/workouts', authMiddleware, workoutRoutes)
router.use('/workout-logs', authMiddleware, workoutLogRoutes)
router.use('/auth', authRoutes)
router.use('/users', authMiddleware, userRoutes)

export default router
