import express from 'express'
import {
  addPlan,
  deletePlan,
  getPlan,
  getPlans,
  updatePlan,
} from '../controllers/plan-controller.js'

const router = express.Router()

router.get('/', getPlans)

router.get('/:id', getPlan)

router.post('/', addPlan)

router.put('/:id', updatePlan)

router.delete('/:id', deletePlan)

export default router
