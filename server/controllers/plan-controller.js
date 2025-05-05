import {
  sanitizeStringQueryParam,
  sanitizeDayQueryParam,
} from '../middleware/sanitization/query-param-sanitization.js'
import planService from '../services/plan-service.js'
import { getQueryFromFilterParameters, mapPlanDTO } from '../utils/get-all.js'

const getPlans = async (req, res) => {
  const filter = sanitizeStringQueryParam(req.query.filter)
  const query = await getQueryFromFilterParameters(filter, req.userObjectId)

  let plans = await planService.getAll(query, { name: 1 })
  plans = await mapPlanDTO(plans, filter === 'public', req.userObjectId)

  return res.json(plans)
}

const getPlan = async (req, res) => {
  return res.json(await planService.getById(req.params.id))
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
    await planService.getWorkouts(
      req.params.id,
      sanitizeDayQueryParam(req.query.day)
    )
  )
}

const addWorkouts = async (req, res) => {
  return res.json(
    await planService.addWorkouts(
      req.params.id,
      [...new Set(req.body.workoutIds)], // remove duplicates
      sanitizeDayQueryParam(req.query.day),
      req.userObjectId
    )
  )
}

const removeWorkout = async (req, res) => {
  await planService.removeWorkout(
    req.params.id,
    req.params.idDel,
    sanitizeDayQueryParam(req.query.day)
  )

  return res.status(204).send()
}

const getTodaysWorkouts = async (req, res) => {
  return res.json(await planService.getTodaysWorkouts(req.userObjectId))
}

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
  getTodaysWorkouts,
}
