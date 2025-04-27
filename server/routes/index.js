import express from 'express'
import exerciseRoutes from './exercise-routes.js'
import planRoutes from './plan-routes.js'
import workoutLogRoutes from './workout-log-routes.js'
import workoutRoutes from './workout-routes.js'
import authRoutes from './auth.js'

const router = express.Router()

router.use('/exercises', exerciseRoutes)
router.use('/plans', planRoutes)
router.use('/workouts', workoutRoutes)
router.use('/workout-logs', workoutLogRoutes)
router.use('/auth', authRoutes)

export default router
