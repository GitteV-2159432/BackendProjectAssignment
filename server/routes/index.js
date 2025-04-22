import express from 'express'
import exerciseRoutes from './exerciseRoutes.js'
import planRoutes from './planRoutes.js'
import workoutRoutes from './workoutRoutes.js'

const router = express.Router()

router.use('/exercises', exerciseRoutes)
router.use('/plans', planRoutes)
router.use('/workouts', workoutRoutes)

export default router
