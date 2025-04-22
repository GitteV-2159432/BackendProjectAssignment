import mongoose from 'mongoose'

const workoutLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    workoutId: {
      type: mongoose.Types.ObjectId,
      ref: 'Workout',
      required: true,
    },
    date: { type: Date, default: Date.now },
    exercises: [
      {
        exerciseId: { type: mongoose.Types.ObjectId, required: true },
        sets: [
          {
            reps: { type: [Number], default: [] },
            weight: { type: [Number], default: [] },
          },
        ],
      },
    ],
    notes: { type: String, default: '' },
  },
  {
    timestamps: true,
  }
)

const WorkoutLog =
  mongoose.model.WorkoutLog || mongoose.model('WorkoutLog', workoutLogSchema)

export default WorkoutLog
