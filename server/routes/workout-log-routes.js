import express from 'express'
import {
  addWorkoutLog,
  deleteWorkoutLog,
  getWorkoutLog,
  getWorkoutLogs,
} from '../controllers/workout-log-controller.js'

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: WorkoutLogs
 *   description: API endpoints for workoutLogs
 */

/**
 * @swagger
 * /WorkoutLogs:
 *   get:
 *     summary: Get all workoutLogs
 *     tags: [WorkoutLogs]
 *     responses:
 *       200:
 *         description: A list of workoutLogs
 */
router.get('/', getWorkoutLogs)

/**
 * @swagger
 * /WorkoutLogs/{id}:
 *   get:
 *     summary: Get a single workoutLog by ID
 *     tags: [WorkoutLogs]
 *     responses:
 *       200:
 *         description: A single workoutLog
 */
router.get('/:id', getWorkoutLog)

/**
 * @swagger
 * /WorkoutLogs:
 *   post:
 *     summary: Create a new workoutLog
 *     tags: [WorkoutLogs]
 *     responses:
 *       201:
 *         description: WorkoutLog created successfully
 */
router.post('/', addWorkoutLog)

/**
 * @swagger
 * /WorkoutLogs/{id}:
 *   delete:
 *     summary: Delete a workoutLog by ID
 *     tags: [WorkoutLogs]
 *     responses:
 *       204:
 *         description: WorkoutLog deleted successfully
 */
router.delete('/:id', deleteWorkoutLog)

export default router
