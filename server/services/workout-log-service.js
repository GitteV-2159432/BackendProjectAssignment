import { addWeeks, format, startOfISOWeek } from 'date-fns'
import mongoose from 'mongoose'

import WorkoutLog from '../models/Workout-Log.js'
import createGenericService from './components/generic-service.js'

const workoutLogService = createGenericService(WorkoutLog)

/**
 * Returns the number of workout logs per ISO calendar week for a given user,
 * covering the past N weeks (including empty weeks as 0).
 *
 * @param {mongoose.Types.ObjectId} userId - The user's ObjectId.
 * @param {Number} weeks - Number of weeks in the past to include (default: 3).
 * @returns {Object} An object where the keys are ISO week numbers (e.g., '15') and the values are counts.
 */
workoutLogService.countLogs = async (userId, weeks = 3) => {
  const nWeeksAgo = new Date()
  nWeeksAgo.setDate(nWeeksAgo.getDate() - weeks * 7)

  const weeklyLogs = await WorkoutLog.aggregate([
    {
      $match: {
        userId: userId,
        date: { $gte: nWeeksAgo },
      },
    },
    {
      $addFields: {
        isoWeek: { $isoWeek: '$date' },
      },
    },
    {
      $group: {
        _id: {
          week: '$isoWeek',
        },
        count: { $sum: 1 },
      },
    },
    {
      $sort: { '_id.week': 1 },
    },
  ])

  const logMap = {}
  weeklyLogs.forEach((log) => {
    const key = log._id.week
    logMap[key] = log.count
  })

  const fullWeeks = {}
  let current = startOfISOWeek(nWeeksAgo)
  while (current <= new Date()) {
    const key = format(current, 'II')
    fullWeeks[key] = logMap[key] ?? 0
    current = addWeeks(current, 1)
  }

  return fullWeeks
}

export default workoutLogService
