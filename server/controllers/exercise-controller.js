import { sanitizeBooleanQueryParam, sanitizeObjectIdQueryParam } from '../middleware/sanitization/query-param-sanitization.js'
import exerciseService from '../services/exercise-service.js'
import userService from '../services/user-service.js'
import HttpError from '../utils/httpError.js'
import mongoose from 'mongoose'

const getExercises = async (req, res) => {
  const categoryId = sanitizeObjectIdQueryParam(req.query.categoryId)
  const bookmark = sanitizeBooleanQueryParam(req.query.bookmark)

  const filter = {}

  filter.category = new mongoose.Types.ObjectId(categoryId);

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
  const exercise = await exerciseService.getById(
    req.params.id,
  )

  return res.json(exercise)
}

const addBookmark = async (req, res) => {
  //TODO
}

const deleteBookmark = async (req, res) => { 
  //TODO
}

const deleteExercise = async (req, res) => {
  //TODO
}

const updateExercise = async (req, res) => {
  //TODO
}

export { getExercises, getExercise, addBookmark, deleteBookmark, deleteExercise, updateExercise }
