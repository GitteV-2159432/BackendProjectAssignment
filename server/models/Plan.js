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
      monday: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Workout' }],
      tuesday: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Workout' }],
      wednesday: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Workout' }],
      thursday: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Workout' }],
      friday: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Workout' }],
      saturday: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Workout' }],
      sunday: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Workout' }],
    },
    isPublic: {
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
