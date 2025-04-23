import exerciseService from '../services/exercise-service.js'

const getExercises = async (req, res) => {
  const { categoryId } = req.query
  return res.json(await exerciseService.getAll(categoryId))
}

export { getExercises }
