import express from 'express'

import authMiddleware from '../middleware/auth.js'
import userIdToObjectId from '../middleware/validation/user-id-to-object-id.js'
import authRoutes from './auth.js'
import categoryRoutes from './category-routes.js'
import exerciseRoutes from './exercise-routes.js'
import planRoutes from './plan-routes.js'
import userRoutes from './user-routes.js'
import workoutLogRoutes from './workout-log-routes.js'
import workoutRoutes from './workout-routes.js'

const router = express.Router()

router.use('/exercises', authMiddleware, exerciseRoutes)
router.use('/plans', authMiddleware, userIdToObjectId, planRoutes)
router.use('/workouts', authMiddleware, userIdToObjectId, workoutRoutes)
router.use('/workout-logs', authMiddleware, userIdToObjectId, workoutLogRoutes)
router.use('/auth', authRoutes)
router.use('/users', authMiddleware, userRoutes)
router.use('/categories', authMiddleware, categoryRoutes)

export default router
