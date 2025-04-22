import mongoose from 'mongoose'

const workoutSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    exercises: [
      {
        exerciseId: {
          type: Number, // Wger exercise ID
          required: true,
        },
        sets: {
          type: Number,
          required: true,
        },
        reps: {
          type: Number,
          required: true,
        },
        notes: {
          type: String,
          default: '',
        },
      },
    ],
    public: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

const Workout = mongoose.model('Workout', workoutSchema)

export default Workout
