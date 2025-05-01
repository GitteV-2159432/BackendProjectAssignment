import userService from '../services/user-service.js'
import workoutService from '../services/workout-service.js'

const getWorkouts = async (req, res) => {
  const userId = req.userObjectId
  let query = {}

  switch (req.query.filter) {
    case 'personal':
      query.userId = userId
      break

    case 'bookmarked':
      const user = await userService.getById(userId)
      query._id = { $in: user.bookmarks.workouts }
      break

    case 'public':
      query.isPublic = true
      query.userId = { $ne: userId }
      break
  }

  const workouts = await workoutService.getAll(query)
  return res.json(workouts)
}

const getWorkout = async (req, res) => {
  return res.json(await workoutService.getById(req.params.id))
}

const addWorkout = async (req, res) => {
  const data = {
    userId: req.userObjectId,
    name: req.body.name,
    description: req.body.description,
    isPublic: req.body.isPublic,
  }

  return res.status(201).json(await workoutService.create(data))
}

const patchWorkout = async (req, res) => {
  const updatedWorkout = await workoutService.update(req.params.id, {
    name: req.body.name,
    description: req.body.description,
    isPublic: req.body.isPublic,
  })

  return res.json(updatedWorkout)
}

const deleteWorkout = async (req, res) => {
  await workoutService.remove(req.params.id)
  return res.sendStatus(204)
}

const bookmarkWorkout = async (req, res) => {
  return res.json(
    await workoutService.bookmark(req.params.id, req.userObjectId)
  )
}

const unbookmarkWorkout = async (req, res) => {
  return res.json(
    await workoutService.unbookmark(req.params.id, req.userObjectId)
  )
}

const getWorkoutExercises = async (req, res) => {
  return res.json(await workoutService.getWorkoutExercises(req.params.id))
}

const addWorkoutExercises = async (req, res) => {
  return res.json(
    await workoutService.addWorkoutExercises(req.params.id, req.body.exercises)
  )
}

const deleteWorkoutExercise = async (req, res) => {
  await workoutService.removeExercise(req.params.id, req.params.idDel)
  return res.sendStatus(204)
}

export {
  addWorkout,
  addWorkoutExercises,
  bookmarkWorkout,
  deleteWorkout,
  deleteWorkoutExercise,
  getWorkout,
  getWorkoutExercises,
  getWorkouts,
  patchWorkout,
  unbookmarkWorkout,
}
