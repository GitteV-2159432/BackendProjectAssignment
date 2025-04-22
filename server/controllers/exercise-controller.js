import { exerciseService } from '../services/exerciseService.js'

const getExercises = async (req, res) => {
  return res.json(await exerciseService.getAll())
}

const getExercise = async (req, res) => {
  const id = req.params.id

  const exercise = await exerciseService.getById(id)
  if (!exercise) {
    return res.status(404).json({ error: `Exercise with id: ${id} not found!` })
  }

  return res.json(exercise)
}

export { getExercises, getExercise }
