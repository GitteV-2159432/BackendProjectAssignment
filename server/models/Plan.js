import mongoose from 'mongoose'

const planSchema = new mongoose.Schema(
  {
    userId: {
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
    workouts: {
      // Key: Day of the week, Value: reference to Workout
      Monday: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workout',
      },
      Tuesday: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workout',
      },
      Wednesday: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workout',
      },
      Thursday: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workout',
      },
      Friday: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workout',
      },
      Saturday: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workout',
      },
      Sunday: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workout',
      },
    },
    public: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

const Plan = mongoose.model.Plan || mongoose.model('Plan', planSchema)

export default Plan
