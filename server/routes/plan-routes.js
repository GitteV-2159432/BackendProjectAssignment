import express from 'express'
import {
  addPlan,
  deletePlan,
  getPlan,
  getPlans,
  updatePlan,
} from '../controllers/plan-controller.js'
import validate from '../middleware/validation/validation.js'
import { validateGetAllQueryParams } from '../middleware/validation/queryParamValidation.js'

const router = express.Router()

router.get('/', [...validateGetAllQueryParams(), validate], getPlans)

router.get('/:id', getPlan)

router.post('/', addPlan)

router.put('/:id', updatePlan)

router.delete('/:id', deletePlan)

export default router
