import express from 'express'
import {
  addPlan,
  deletePlan,
  getPlan,
  getPlans,
  updatePlan,
} from '../controllers/plan-controller.js'
import userIdToObjectId from '../middleware/validation/user-id-to-object-id.js'
import validate from '../middleware/validation/validation.js'
import { validateGetAllQueryParams } from '../middleware/validation/query-param-validation.js'
import { query } from 'express-validator'

const router = express.Router()

router.get(
  '/',
  userIdToObjectId,
  [...validateGetAllQueryParams(), validate],
  getPlans
)

router.get('/:id', getPlan)

router.post('/', addPlan)

router.put('/:id', updatePlan)

router.delete('/:id', deletePlan)

export default router
