import mongoose from 'mongoose'

import Workout from '../../models/Workout.js'
import HttpError from '../../utils/httpError.js'

const workoutIdToObjectId = async (req, res, next) => {
  if (req.query && req.query.workoutId) {
    try {
      const workoutObjectId = new mongoose.Types.ObjectId(
        String(req.query.workoutId)
      )
      if (!(await Workout.findById(workoutObjectId))) {
        throw new HttpError(404, 'Workout not found!')
      }

      req.workoutObjectId = workoutObjectId
    } catch (err) {
      throw new HttpError(400, 'Invalid workout Id format.')
    }
  }
  next()
}

export default workoutIdToObjectId
