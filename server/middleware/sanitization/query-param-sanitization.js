import mongoose from 'mongoose'

const sanitizeBooleanQueryParam = (value) => {
  return ['true', 'on', '1'].includes(String(value).trim().toLowerCase())
}

const sanitizeObjectIdQueryParam = (value) => {
  return new mongoose.Types.ObjectId(String(value))
}

export { sanitizeBooleanQueryParam, sanitizeObjectIdQueryParam }
