import express from 'express'
import {
  addPlan,
  deletePlan,
  getPlan,
  getPlans,
  updatePlan,
} from '../controllers/plan-controller.js'
import userIdToObjectId from '../middleware/validation/user-id-to-object-id.js'
import validateObjectId from '../middleware/validation/object-id-validation.js'
import validate from '../middleware/validation/validation.js'
import { validateGetAllQueryParams } from '../middleware/validation/query-param-validation.js'
import validateCreate from '../middleware/validation/plan/create-validation.js'

const router = express.Router()

router.get(
  '/',
  userIdToObjectId,
  [...validateGetAllQueryParams(), validate],
  getPlans
)

router.get(
  '/:id',
  userIdToObjectId,
  [validateObjectId('id'), validate],
  getPlan
)

router.post('/', userIdToObjectId, [...validateCreate(), validate], addPlan)

router.put('/:id', updatePlan)

router.delete('/:id', deletePlan)

export default router
