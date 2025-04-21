import mongoose from 'mongoose'

const workoutSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  exercises: [
    {
      exerciseId: Number,
      sets: Number,
      reps: [Number],
      weight: [Number],
    },
  ],
  notes: String,
})

const Workout = mongoose.model('Workout', workoutSchema)

export default Workout
