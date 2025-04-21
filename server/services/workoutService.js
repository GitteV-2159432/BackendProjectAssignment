import Workout from '../models/Workout.js'
import { createGenericService } from './generic-service.js'

const workoutService = createGenericService(Workout)

export default workoutService
