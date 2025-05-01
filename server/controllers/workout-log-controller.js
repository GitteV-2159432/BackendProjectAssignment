import workoutLogService from '../services/workout-log-service.js'
import HttpError from '../utils/http-error.js'

const getPastProgress = async (req, res) => {
  const pastProgress = await workoutLogService.countLogs(req.userObjectId)
  if (!pastProgress) {
    throw new HttpError(500, 'Error while counting past workouts.')
  }

  return res.json(pastProgress)
}

const getLatestLog = async (req, res) => {
  const log = await workoutLogService.getByQuery(
    { userId: req.userObjectId, workoutId: req.query.workoutId },
    { date: -1 }
  )

  return res.json(log)
}

const addWorkoutLog = async (req, res) => {
  const { workoutId, exercises, notes, durationInMinutes, date } = req.body
  const data = {
    userId: req.userObjectId,
    workoutId,
    exercises,
    notes,
    durationInMinutes,
    date,
  }

  const newWorkoutLog = await workoutLogService.create(data)
  if (!newWorkoutLog) {
    throw new HttpError(500, 'Creation of workout log failed.')
  }

  return res.status(201).json(newWorkoutLog)
}

export { getPastProgress, getLatestLog, addWorkoutLog }
