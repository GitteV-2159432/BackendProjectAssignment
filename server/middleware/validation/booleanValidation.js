import { check } from 'express-validator'

const validateBoolean = (name, isRequired) => {
  if (isRequired) {
    return [
      check(name)
        .exists()
        .withMessage(`${name} is required.`)
        .bail()
        .isBoolean()
        .withMessage(`${name} must be true or false.`)
        .toBoolean(),
    ]
  }

  return [
    check(name)
      .optional()
      .isBoolean()
      .withMessage(`${name} must be true or false.`)
      .toBoolean(),
  ]
}

export default validateBoolean
