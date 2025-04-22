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
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter exercises by category
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Limit the number of returned exercises
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *         description: Number of exercises to skip (used for pagination)
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
