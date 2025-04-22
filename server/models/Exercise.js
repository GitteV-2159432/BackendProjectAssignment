import mongoose from 'mongoose'

const LicenseInfoSchema = new mongoose.Schema({
  license: Number,
  license_title: String,
  license_object_url: String,
  license_author: String,
  license_author_url: String,
  license_derivative_source_url: String,
  author_history: [String]
}, { _id: false })

const ImageSchema = new mongoose.Schema({
  id: Number,
  uuid: String,
  exercise: Number,
  exercise_uuid: String,
  image: String,
  is_main: Boolean,
  style: String,
  ...LicenseInfoSchema.obj  
}, { _id: false })

const VideoSchema = new mongoose.Schema({
  id: Number,
  uuid: String,
  exercise: Number,
  video: String,
  is_main: Boolean,
  size: Number,
  duration: String,
  width: Number,
  height: Number,
  codec: String,
  codec_long: String,
  ...LicenseInfoSchema.obj
}, { _id: false })

const MuscleSchema = new mongoose.Schema({
  id: Number,
  name: String,
  name_en: String,
  is_front: Boolean,
  image_url_main: String,
  image_url_secondary: String
}, { _id: false })

const EquipmentSchema = new mongoose.Schema({
  id: Number,
  name: String
}, { _id: false })

const CategorySchema = new mongoose.Schema({
  id: Number,
  name: String
}, { _id: false })

const ExerciseSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  uuid: { type: String, required: true },
  name: { type: String, required: true },
  description: String,
  category: CategorySchema,
  muscles: [MuscleSchema],
  muscles_secondary: [MuscleSchema],
  equipment: [EquipmentSchema],
  images: [ImageSchema],
  videos: [VideoSchema]
}, { timestamps: true })

export default mongoose.model('Exercise', ExerciseSchema)
