import express from "express";
import { addSession, deleteSession, getSession, getSessions } from "../controllers/sessions-controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Sessions
 *   description: API endpoints for workout sessions
 */

/**
 * @swagger
 * /sessions:
 *   get:
 *     summary: Get all workout sessions
 *     tags: [Sessions]
 *     responses:
 *       200:
 *         description: A list of workout sessions
 */
router.get("/", getSessions);

/**
 * @swagger
 * /sessions/{id}:
 *   get:
 *     summary: Get a single workout session by ID
 *     tags: [Sessions]
 *     responses:
 *       200:
 *         description: A single workout session
 */
router.get("/:id", getSession);

/**
 * @swagger
 * /sessions:
 *   post:
 *     summary: Create a new workout session
 *     tags: [Sessions]
 *     responses:
 *       201:
 *         description: Workout session created successfully
 */
router.post("/", addSession);

/**
 * @swagger
 * /sessions/{id}:
 *   delete:
 *     summary: Delete a workout session by ID
 *     tags: [Sessions]
 *     responses:
 *       204:
 *         description: Workout session deleted successfully
 */
router.delete("/:id", deleteSession);


export default router;
