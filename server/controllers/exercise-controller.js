import exerciseService from '../services/exercise-service.js'

const getExercises = async (req, res) => {
  return res.json(await exerciseService.getAll())
}

export { getExercises }
