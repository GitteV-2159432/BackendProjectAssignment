import mongoose from 'mongoose'
import Workout from '../models/Workout.js'
import createGenericService from './components/generic-service.js'
import HttpError from '../utils/httpError.js'
import createBookmarkService from './bookmark-service.js'

const workoutService = createGenericService(Workout)
const bookmarkService = createBookmarkService(Workout)

workoutService.getWorkoutExercises = async (workoutId) => {
  const workout = await workoutService.getById(workoutId)
  return workout.exercises
}

workoutService.addWorkoutExercises = async (workoutId, exercises) => {
  const newExercises = exercises.map((ex) => ({
    ...ex,
    _id: new mongoose.Types.ObjectId(),
  }))

  const updatedWorkout = await Workout.findByIdAndUpdate(
    workoutId,
    { $push: { exercises: { $each: newExercises } } },
    { new: true }
  )

  return updatedWorkout.exercises.filter((ex) =>
    newExercises.some((added) => added._id.equals(ex._id))
  )
}

workoutService.removeExercise = async (workoutId, exerciseId) => {
  const workoutExercises = await workoutService.getWorkoutExercises(workoutId)
  if (!workoutExercises.find((ex) => ex._id.equals(exerciseId))) {
    throw new HttpError(404, 'Workout exercise not found.')
  }

  return Workout.findByIdAndUpdate(
    workoutId,
    { $pull: { exercises: { _id: exerciseId } } }, // pull the exercise with matching _id
    { new: true }
  )
}

workoutService.bookmark = async (workoutId, userId) => {
  return await bookmarkService.setBookmark(workoutId, userId)
}

workoutService.unbookmark = async (workoutId, userId) => {
  return await bookmarkService.removeBookmark(workoutId, userId)
}

export default workoutService
