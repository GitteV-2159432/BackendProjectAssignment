import mongoose from 'mongoose'
import { check } from 'express-validator'

const validateObjectId = (idName, { required = true } = {}) => {
  const validator = check(idName)
    .trim()
    .escape()

  if (required) {
    validator.notEmpty()
      .withMessage(`${idName} can't be empty.`)
      .bail()
  } else {
    validator.optional({ checkFalsy: true })
  }

  validator
    .custom((id) => mongoose.Types.ObjectId.isValid(id))
    .withMessage(`Invalid ${idName} format.`)
    .bail()
    .customSanitizer((id) => new mongoose.Types.ObjectId(String(id)))

  return validator
}

export default validateObjectId
