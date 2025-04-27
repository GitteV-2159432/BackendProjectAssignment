import mongoose from 'mongoose'

const workoutSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: { type: String, required: true },
    description: { type: String, default: '' },
    exercises: [
      {
        exerciseId: {
          type: mongoose.Types.ObjectId,
          ref: 'Exercise',
          required: true,
        },
        sets: [
          {
            reps: { type: Number, required: true },
          },
        ],
        restSecondsBetweenSets: { type: Number, required: true },
        notes: {
          type: String,
          default: '',
        },
      },
    ],
    isPublic: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
)

const Workout =
  mongoose.models.Workout || mongoose.model('Workout', workoutSchema)

export default Workout
