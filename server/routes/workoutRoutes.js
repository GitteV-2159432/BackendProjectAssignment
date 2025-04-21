import express from 'express'
import {
  addWorkout,
  deleteWorkout,
  getWorkout,
  getWorkouts,
} from '../controllers/workout-controller.js'

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Workouts
 *   description: API endpoints for workouts
 */

/**
 * @swagger
 * /Workouts:
 *   get:
 *     summary: Get all workouts
 *     tags: [Workouts]
 *     responses:
 *       200:
 *         description: A list of workouts
 */
router.get('/', getWorkouts)

/**
 * @swagger
 * /Workouts/{id}:
 *   get:
 *     summary: Get a single workout by ID
 *     tags: [Workouts]
 *     responses:
 *       200:
 *         description: A single workout
 */
router.get('/:id', getWorkout)

/**
 * @swagger
 * /Workouts:
 *   post:
 *     summary: Create a new workout
 *     tags: [Workouts]
 *     responses:
 *       201:
 *         description: Workout created successfully
 */
router.post('/', addWorkout)

/**
 * @swagger
 * /Workouts/{id}:
 *   delete:
 *     summary: Delete a workout by ID
 *     tags: [Workouts]
 *     responses:
 *       204:
 *         description: Workout deleted successfully
 */
router.delete('/:id', deleteWorkout)

export default router
