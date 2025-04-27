import { body } from 'express-validator'

const validateString = (name, maxLength, isRequired) => {
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
    .isString()
    .withMessage(`${name} has to be of type string.`)
    .bail()

  validator = validator
    .isLength({ max: maxLength })
    .withMessage(`${name} can't be longer than ${maxLength} characters.`)
    .bail()

  return validator
}

export default validateString
