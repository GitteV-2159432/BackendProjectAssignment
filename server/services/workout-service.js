import Workout from '../models/Workout.js'
import createGenericService from './components/generic-service.js'

const workoutService = createGenericService(Workout)

export default workoutService
