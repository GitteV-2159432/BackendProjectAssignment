import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
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
});

const Session = mongoose.model('Session', sessionSchema);

export default Session;
