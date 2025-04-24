import { check } from 'express-validator'

const objectIdValidation = (idName) => {
  return [
    check(idName)
      .trim()
      .escape()
      .notEmpty()
      .withMessage(`${idName} is required!`)
      .isLength({ min: 24, max: 24 })
      .withMessage(`${idName} must be exactly 24 characters long.`),
  ]
}

export default objectIdValidation
