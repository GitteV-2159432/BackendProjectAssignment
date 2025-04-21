import workoutService from '../services/workoutService.js'

const getWorkouts = async (req, res) => { 
  return res.json(await workoutService.getAll())
}

const getWorkout = async (req, res) => {
  // TODO
}

const addWorkout = async (req, res) => {
  // TODO
}

const deleteWorkout = async (req, res) => {
  // TODO
}

export { getWorkouts, getWorkout, addWorkout, deleteWorkout }
