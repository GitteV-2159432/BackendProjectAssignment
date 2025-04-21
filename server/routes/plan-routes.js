import express from 'express'
import {
    addPlan,
    deletePlan,
    getPlan,
    getPlans,
    updatePlan,
} from '../controllers/plan-controller.js'

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Plans
 *   description: API endpoints for workout plans
 */

/**
 * @swagger
 * /plans:
 *   get:
 *     summary: Get all plans
 *     tags: [Plans]
 *     responses:
 *       200:
 *         description: A list of plans
 */
router.get('/', getPlans)

/**
 * @swagger
 * /plans/{id}:
 *   get:
 *     summary: Get a single plan by ID
 *     tags: [Plans]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Plan ID
 *     responses:
 *       200:
 *         description: A single plan
 */
router.get('/:id', getPlan)

/**
 * @swagger
 * /plans:
 *   post:
 *     summary: Create a new workout plan
 *     tags: [Plans]
 *     responses:
 *       201:
 *         description: Plan created successfully
 */
router.post('/', addPlan)

/**
 * @swagger
 * /plans/{id}:
 *   put:
 *     summary: Update a plan by ID
 *     tags: [Plans]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Plan ID
 *     responses:
 *       200:
 *         description: The updated plan
 */
router.put('/:id', updatePlan)

/**
 * @swagger
 * /plans/{id}:
 *   delete:
 *     summary: Delete a plan by ID
 *     tags: [Plans]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Plan ID
 *     responses:
 *       204:
 *         description: Plan deleted successfully
 */
router.delete('/:id', deletePlan)

export default router
