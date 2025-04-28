import { body } from 'express-validator'

const validateBoolean = (name, isRequired) => {
  let validator = body(name)

  if (isRequired) {
    validator = validator.exists().withMessage(`${name} is required.`).bail()
  } else {
    validator = validator.optional()
  }

  validator = validator
    .isBoolean()
    .withMessage(`${name} must be true or false.`)

  return validator.toBoolean()
}

export default validateBoolean
