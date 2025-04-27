import { body } from 'express-validator'
import validateString from '../string-validation.js'
import validateBoolean from '../boolean-validation.js'

const validateCreation = () => {
  return [
    validateString('name', 64, true),
    validateString('description', 256, false),
    validateBoolean('isPublic', false),
    validateBoolean('active', false),
  ]
}

export default validateCreation
