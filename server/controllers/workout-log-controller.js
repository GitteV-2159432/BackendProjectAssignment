import workoutLogService from '../services/workout-log-service.js'

const getWorkoutLogs = async (req, res) => {
  return res.json(await workoutLogService.getAll())
}

const getWorkoutLog = async (req, res) => {
  // TODO
}

const addWorkoutLog = async (req, res) => {
  // TODO
}

const deleteWorkoutLog = async (req, res) => {
  // TODO
}

export { getWorkoutLogs, getWorkoutLog, addWorkoutLog, deleteWorkoutLog }
