import validateObjectId from '../object-id-validation.js'
import validateString from '../string-validation.js'

const validateUpdate = () => {
  return [
    validateObjectId('id'),
    validateString('name', 64, true),
    validateString('description', 256, false),
    validateObjectId('category'),
    validateObjectId('muscles', { required: false }),
    validateObjectId('muscles_secondary', { required: false }),
    validateString('equipment', 64, false),
    validateString('images', 1028, false),
  ]
}

export default validateUpdate
