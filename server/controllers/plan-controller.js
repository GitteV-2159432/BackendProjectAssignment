import {
  sanitizeBooleanQueryParam,
  sanitizeDayQueryParam,
} from '../middleware/sanitization/query-param-sanitization.js'
import planService from '../services/plan-service.js'
import userService from '../services/user-service.js'

const getPlans = async (req, res) => {
  const isPublic = sanitizeBooleanQueryParam(req.query.isPublic)
  const bookmark = sanitizeBooleanQueryParam(req.query.bookmark)

  const filter = { isPublic }

  if (!isPublic) {
    filter.userId = req.userObjectId
  }

  if (isPublic) {
    filter._id = {
      [bookmark ? '$in' : '$nin']: (await userService.getById(req.userObjectId))
        .bookmarks.plans,
    }
  }

  return res.json(await planService.getAll(filter, { name: 1 }))
}

const getPlan = async (req, res) => {
  const plan = await planService.getByIdWithPermissionCheck(
    req.params.id,
    req.userObjectId
  )

  return res.json(plan)
}

const addPlan = async (req, res) => {
  const newPlan = await planService.create({
    name: req.body.name,
    description: req.body.description,
    isPublic: req.body.isPublic,
    userId: req.userObjectId,
  })

  return res.status(201).json(newPlan)
}

const updatePlan = async (req, res) => {
  await planService.checkPermission(req.params.id, req.userObjectId)

  const updatedPlan = await planService.update(req.params.id, {
    name: req.body.name,
    description: req.body.description,
    isPublic: req.body.isPublic,
  })

  return res.json(updatedPlan)
}

const deletePlan = async (req, res) => {
  await planService.checkPermission(req.params.id, req.userObjectId)
  await planService.remove(req.params.id)

  return res.status(204).send()
}

const getActivePlan = async (req, res) => {
  return res.json(await planService.getActive(req.userObjectId))
}

const setActivePlan = async (req, res) => {
  return res.json(await planService.setActive(req.params.id, req.userObjectId))
}

const removeActivePlan = async (req, res) => {
  await planService.removeActive(req.params.id, req.userObjectId)
  return res.status(204).send()
}

const bookmarkPlan = async (req, res) => {
  return res.json(
    await planService.setBookmark(req.params.id, req.userObjectId)
  )
}

const unbookmarkPlan = async (req, res) => {
  return res.json(
    await planService.removeBookmark(req.params.id, req.userObjectId)
  )
}

const getWorkouts = async (req, res) => {
  return res.json(
    await planService.getWorkouts(req.params.id, req.userObjectId)
  )
}

const addWorkouts = async (req, res) => {
  return res.json(
    await planService.addWorkouts(
      req.params.id,
      req.body.workoutIds,
      sanitizeDayQueryParam(req.query.day),
      req.userObjectId
    )
  )
}

const removeWorkout = async (req, res) => {}

const getTodaysWorkout = async (req, res) => {}

export {
  getPlans,
  getPlan,
  addPlan,
  updatePlan,
  deletePlan,
  getActivePlan,
  setActivePlan,
  removeActivePlan,
  bookmarkPlan,
  unbookmarkPlan,
  getWorkouts,
  addWorkouts,
  removeWorkout,
  getTodaysWorkout,
}
