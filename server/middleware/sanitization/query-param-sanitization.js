import mongoose from 'mongoose'

const sanitizeBooleanQueryParam = (value) => {
  return ['true', 'on', '1'].includes(String(value).trim().toLowerCase())
}

const sanitizeStringQueryParam = (value) => {
  return value.trim().toLowerCase()
}

const sanitizeObjectIdQueryParam = (value) => {
  return new mongoose.Types.ObjectId(String(value))
}

const sanitizeDayQueryParam = (value) => {
  return value === undefined ? false : value.trim().toLowerCase()
}

export {
  sanitizeBooleanQueryParam,
  sanitizeDayQueryParam,
  sanitizeObjectIdQueryParam,
  sanitizeStringQueryParam,
}
