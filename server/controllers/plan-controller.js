import { sanitizeBooleanQueryParam } from '../middleware/sanitization/query-param-sanitization.js'
import planService from '../services/plan-service.js'
import userService from '../services/user-service.js'
import HttpError from '../utils/httpError.js'
import mongoose from 'mongoose'

const getPlans = async (req, res) => {
  const isPublic = sanitizeBooleanQueryParam(req.query.isPublic)
  const bookmark = sanitizeBooleanQueryParam(req.query.bookmark)

  const filter = { isPublic }

  if (!isPublic) {
    filter.userId = req.userObjectId
  }

  if (isPublic) {
    if (bookmark) {
      filter._id = {
        $in: (await userService.getById(req.userObjectId)).bookmarks.plans,
      }
    } else {
      filter._id = {
        $nin: (await userService.getById(req.userObjectId)).bookmarks.plans,
      }
    }
  }

  return res.json(await planService.getAll(filter))
}

const getPlan = async (req, res) => {
  const plan = await planService.getById(req.params.id)

  if (!plan.isPublic && !plan.userId.equals(req.userObjectId)) {
    throw new HttpError(403, 'You do not have permission to access this plan.')
  }

  return res.json(plan)
}

const addPlan = async (req, res) => {
  // TODO
}

const updatePlan = async (req, res) => {
  // TODO
}

const deletePlan = async (req, res) => {
  // TODO
}

export { getPlans, getPlan, addPlan, updatePlan, deletePlan }
