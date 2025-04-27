import express from 'express'
import exerciseRoutes from './exercise-routes.js'
import planRoutes from './plan-routes.js'
import workoutLogRoutes from './workout-log-routes.js'
import authRoutes from './auth.js'
import authMiddleware from '../middleware/auth.js'

const router = express.Router()

router.use('/exercises', exerciseRoutes)
router.use('/plans', authMiddleware, planRoutes)
router.use('/workout-logs', workoutLogRoutes)
router.use('/auth', authRoutes)

export default router
