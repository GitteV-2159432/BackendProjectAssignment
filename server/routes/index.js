import express from 'express'
import exerciseRoutes from './exercise-routes.js'
import planRoutes from './plan-routes.js'
import workoutLogRoutes from './workout-log-routes.js'

const router = express.Router()

router.use('/exercises', exerciseRoutes)
router.use('/plans', planRoutes)
router.use('/workout-logs', workoutLogRoutes)

export default router
