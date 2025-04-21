import WorkoutLog from '../models/Workout-Log.js'
import { createGenericService } from './generic-service.js'

const workoutLogService = createGenericService(WorkoutLog)

export default workoutLogService
