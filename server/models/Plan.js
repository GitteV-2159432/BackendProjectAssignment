import mongoose from 'mongoose'

const planSchema = new mongoose.Schema(
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
    schedule: {
      type: [String], // Optional: just a list of active days
      default: [],
    },
    workouts: {
      // Key: Day of the week, Value: reference to CustomWorkout
      Monday: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CustomWorkout',
      },
      Tuesday: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CustomWorkout',
      },
      Wednesday: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CustomWorkout',
      },
      Thursday: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CustomWorkout',
      },
      Friday: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CustomWorkout',
      },
      Saturday: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CustomWorkout',
      },
      Sunday: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CustomWorkout',
      },
    },
    public: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

const Plan = mongoose.model('Plan', planSchema)

export default Plan
