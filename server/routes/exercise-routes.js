import express from 'express'
import { getExercises } from '../controllers/exercise-controller.js'

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
 *     parameters:
 *       - in: query
 *         name: categoryId
 *         description: Category of exercise.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of exercises
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/', getExercises)

export default router
