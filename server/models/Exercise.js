import mongoose from 'mongoose'

const exerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  category: {
    type: mongoose.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  muscles: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Muscle',
      default: [],
    },
  ],
  muscles_secondary: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Muscle',
      default: [],
    },
  ],
  equipment: [{ type: String, default: '' }],
  images: [{ type: String, default: '' }],
})

const Exercise =
  mongoose.models.Exercise || mongoose.model('Exercise', exerciseSchema)

export default Exercise
