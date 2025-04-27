import workoutService from '../services/workout-service.js'
import userService from '../services/user-service.js'

const getWorkouts = async (req, res) => {
  const filter = { isPublic: req.query.isPublic }
  if (req.query.isPublic && req.query.bookmark) {
    filter._id = {
      $in: (await userService.getById(req.userObjectId)).bookmarks.workouts,
    }
  }

  return res.json(await workoutService.getAll(filter))
}

const getWorkout = async (req, res) => {
  return res.json(await workoutService.getById(req.params.id))
}

const addWorkout = async (req, res) => {}

const patchWorkout = async (req, res) => {}

const deleteWorkout = async (req, res) => {}

const bookmarkWorkout = async (req, res) => {}

const unbookmarkWorkout = async (req, res) => {}

const getWorkoutExercises = async (req, res) => {}

const addWorkoutExercise = async (req, res) => {}

const deleteWorkoutExercise = async (req, res) => {}

export {
  getWorkouts,
  getWorkout,
  addWorkout,
  patchWorkout,
  deleteWorkout,
  bookmarkWorkout,
  unbookmarkWorkout,
  getWorkoutExercises,
  addWorkoutExercise,
  deleteWorkoutExercise,
}
