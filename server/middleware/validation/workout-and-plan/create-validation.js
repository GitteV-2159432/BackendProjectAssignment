import validateString from '../string-validation.js'
import validateBoolean from '../boolean-validation.js'

const validateCreate = () => {
  return [
    validateString('name', 64, true),
    validateString('description', 256, false),
    validateBoolean('isPublic', false),
  ]
}

export default validateCreate
