import mongoose from 'mongoose'

const workoutLogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    exercises: [
      {
        exerciseId: {
          type: Number, // Wger ID
          required: true,
        },
        sets: {
          type: Number,
          required: true,
        },
        reps: {
          type: [Number], // e.g. [10, 10, 8]
          default: [],
        },
        weight: {
          type: [Number], // e.g. [50, 50, 45]
          default: [],
        },
      },
    ],
    notes: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
)

const WorkoutLog = mongoose.model('WorkoutLog', workoutLogSchema)

export default WorkoutLog
