import mongoose from 'mongoose'

const muscleSchema = new mongoose.Schema({
  wgerId: { type: Number, required: true },
  name: { type: String, required: true },
  name_en: { type: String, default: '' },
  image_url_main: { type: String, default: '' },
  image_url_secondary: { type: String, default: '' },
})

const Muscle = mongoose.models.Muscle || mongoose.model('Muscle', muscleSchema)

export default Muscle
