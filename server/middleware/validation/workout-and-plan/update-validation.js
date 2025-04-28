import validateObjectId from '../object-id-validation.js'
import validateString from '../string-validation.js'
import validateBoolean from '../boolean-validation.js'

const validateUpdate = () => {
  return [
    validateObjectId('id'),
    validateString('name', 64, true),
    validateString('description', 256, false),
    validateBoolean('isPublic', false),
  ]
}

export default validateUpdate
