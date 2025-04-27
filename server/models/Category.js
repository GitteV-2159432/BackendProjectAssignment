import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema({
  wgerId: { type: Number, required: true },
  name: { type: String, required: true },
})

const Category =
  mongoose.models.Category || mongoose.model('Category', categorySchema)

export default Category
