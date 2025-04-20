import mongoose from 'mongoose';

const planSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  schedule: {
    type: [String], // e.g. ['Monday', 'Wednesday', 'Friday']
    default: [],
  },
  exercises: [
    {
      exerciseId: { type: Number, required: true },
      sets: Number,
      reps: Number,
      notes: String,
    },
  ],
  public: {
    type: Boolean,
    default: false,
  },
//   user: {
//     type: Schema.Types.ObjectId,
//     ref: 'User', // Optional: link to user if authentication is added
//   },
}, {
  timestamps: true,
});

const Plan = mongoose.model('Plan', planSchema);

export default Plan;
