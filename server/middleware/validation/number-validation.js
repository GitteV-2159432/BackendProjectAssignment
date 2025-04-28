import { body } from 'express-validator'

const validateNumber = (name, isRequired) => {
  let validator = body(name)

  if (isRequired) {
    validator = validator
      .trim()
      .escape()
      .isEmpty()
      .withMessage(`${name} is required.`)
      .bail()
  } else {
    validator = validator.optional()
  }

  validator = validator
    .isNumeric()
    .withMessage(`${name} has to be a number.`)
    .bail()

  return validator
}

const validateFloat = (name, isRequired) => {
  let validator = validateNumber(name, isRequired)
  return validator.toFloat()
}

const validateInt = (name, isRequired) => {
  let validator = validateNumber(name, isRequired)
  return validator.toInt()
}

export { validateFloat, validateInt }
