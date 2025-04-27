import { sanitizeBooleanQueryParam } from '../middleware/sanitization/query-param-sanitization.js'
import planService from '../services/plan-service.js'
import userService from '../services/user-service.js'

const getPlans = async (req, res) => {
  const isPublic = sanitizeBooleanQueryParam(req.query.isPublic)
  const bookmark = sanitizeBooleanQueryParam(req.query.bookmark)

  const filter = { isPublic }

  if (isPublic && bookmark) {
    filter._id = {
      $in: (await userService.getById(req.userObjectId)).bookmarks.plans,
    }
  }

  return res.json(await planService.getAll(filter))
}

const getPlan = async (req, res) => {
  // TODO
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
