import express from 'express'
import {
  getExercise,
  getExercises,
} from '../controllers/exercise-controller.js'

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Exercises
 *   description: API endpoints for exercises
 */

/**
 * @swagger
 * /exercises:
 *   get:
 *     summary: Get all exercises
 *     tags: [Exercises]
 *     responses:
 *       200:
 *         description: A list of exercises
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.get('/', getExercises)

/**
 * @swagger
 * /exercises/{id}:
 *   get:
 *     summary: Get a single exercise by ID
 *     tags: [Exercises]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Exercise ID
 *     responses:
 *       200:
 *         description: A single exercise
 */
router.get('/:id', getExercise)

export default router
