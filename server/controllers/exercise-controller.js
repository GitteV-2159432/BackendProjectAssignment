import {
  sanitizeBooleanQueryParam,
  sanitizeObjectIdQueryParam,
} from '../middleware/sanitization/query-param-sanitization.js'
import exerciseService from '../services/exercise-service.js'
import userService from '../services/user-service.js'
import HttpError from '../utils/http-error.js'
import mongoose from 'mongoose'

const getExercises = async (req, res) => {
  const categoryId = sanitizeObjectIdQueryParam(req.query.categoryId)
  const bookmark = sanitizeBooleanQueryParam(req.query.bookmark)

  const filter = {}

  filter.category = new mongoose.Types.ObjectId(categoryId)

  if (bookmark) {
    filter._id = {
      $in: (await userService.getById(req.userObjectId)).bookmarks.plans,
    }
  } else {
    filter._id = {
      $nin: (await userService.getById(req.userObjectId)).bookmarks.plans,
    }
  }

  return res.json(await exerciseService.getAll(filter))
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
  getExercises,
  getExercise,
  bookmarkExercise,
  unbookmarkExercise,
  deleteExercise,
  updateExercise,
}
