import workoutLogService from '../services/workout-log-service.js'
import httpError from '../utils/httpError.js'
import toObjectId from '../utils/toObjectId.js'

const getPastProgress = async (req, res) => {
  const { userId } = req.query

  const pastProgress = await workoutLogService.countLogs(toObjectId(userId))
  if (!pastProgress) {
    throw new httpError(
      500,
      'Something went wrong, when counting past workouts.'
    )
  }

  return res.json(pastProgress)
}

const getLatestLog = async (req, res) => {
  const { userId, workoutId } = req.query

  const log = await workoutLogService.getLatest(
    toObjectId(userId),
    toObjectId(workoutId)
  )
  if (!log) {
    throw new httpError(404, 'No corresponding workout log found.')
  }

  return res.json(log)
}

const addWorkoutLog = async (req, res) => {
  const { userId, workoutId, exercises, notes, durationInMinutes, date } =
    req.body
  const data = { userId, workoutId, exercises, notes, durationInMinutes, date }

  const newWorkoutLog = await workoutLogService.create(data)
  if (!newWorkoutLog) {
    throw new httpError(500, 'Creation of workout log failed.')
  }

  return res.status(201).json(newWorkoutLog)
}

export { getPastProgress, getLatestLog, addWorkoutLog }
