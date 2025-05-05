import {
  sanitizeObjectIdQueryParam,
  sanitizeStringQueryParam,
} from '../middleware/sanitization/query-param-sanitization.js'
import exerciseService from '../services/exercise-service.js'
import { getQueryFromFilterParameters, mapModelDTO } from '../utils/get-all.js'

const getExercises = async (req, res) => {
  const categoryId = sanitizeObjectIdQueryParam(req.query.categoryId)
  const filter = sanitizeStringQueryParam(req.query.filter)

  const query = await getQueryFromFilterParameters(
    filter,
    req.userObjectId,
    'exercises'
  )

  query.category = categoryId

  let exercises = await exerciseService.getAll(query, { name: 1 })
  if (filter === 'public') {
    exercises = await mapModelDTO(exercises, 'exercises', req.userObjectId)
  }

  return res.json(exercises)
}

const getExercise = async (req, res) => {
  const exercise = await exerciseService.getById(req.params.id)

  return res.json(exercise)
}

const bookmarkExercise = async (req, res) => {
  return res.json(
    await exerciseService.setBookmark(req.params.id, req.userObjectId)
  )
}

const unbookmarkExercise = async (req, res) => {
  return res.json(
    await exerciseService.removeBookmark(req.params.id, req.userObjectId)
  )
}

const deleteExercise = async (req, res) => {
  // Check if user is admin
  await exerciseService.checkPermission(req.userObjectId)
  await exerciseService.remove(req.params.id)

  return res.status(204).send()
}

const updateExercise = async (req, res) => {
  // Check if user is admin
  await exerciseService.checkPermission(req.userObjectId)

  const updatedExercise = await exerciseService.update(req.params.id, {
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    muscles: req.body.muscles,
    muscles_secondary: req.body.muscles_secondary,
    equipment: req.body.equipment,
    images: req.body.images,
  })

  return res.json(updatedExercise)
}

export {
  bookmarkExercise,
  deleteExercise,
  getExercise,
  getExercises,
  unbookmarkExercise,
  updateExercise,
}
