import mongoose from 'mongoose'
import { addWeeks, startOfISOWeek, format } from 'date-fns'

import WorkoutLog from '../models/Workout-Log.js'
import { createGenericService } from './generic-service.js'
import httpError from '../utils/httpError.js'

const workoutLogService = {}

workoutLogService.create = createGenericService(WorkoutLog).create

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
        createdAt: { $gte: nWeeksAgo },
      },
    },
    {
      $addFields: {
        isoWeek: { $isoWeek: '$createdAt' },
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

/**
 * Retrieves the most recent workout log for a specific user and workout.
 *
 * @param {mongoose.Types.ObjectId} userId - The user's ObjectId.
 * @param {mongoose.Types.ObjectId} workoutId - The workout's ObjectId.
 * @returns {Promise<WorkoutLog>} The latest matching workout log, or null if none found.
 */
workoutLogService.getLatest = async (userId, workoutId) => {
  const workoutLog = await WorkoutLog.findOne({
    userId: userId,
    workoutId: workoutId,
  }).sort({ createdAt: -1 })

  return workoutLog
}

export default workoutLogService
