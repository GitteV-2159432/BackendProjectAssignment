import express from "express";
import { getExercises } from "../controllers/exercise-controller.js";

const router = express.Router();

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
 */
router.get('/', getExercises);


export default router;
