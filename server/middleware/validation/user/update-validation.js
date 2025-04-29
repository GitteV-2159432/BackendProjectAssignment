import validateObjectId from '../object-id-validation.js'
import validateString from '../string-validation.js'


const validateUpdate = () => {
  return [
    validateObjectId('id'),
    validateString('Firstname', 64, true),
    validateString('lastName', 64, true),
    validateString('email', 64, true),
    validateString('passwordHash', 128, true),
    validateString('type', 16, true)
  ]
}

export default validateUpdate
