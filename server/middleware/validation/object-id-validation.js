import mongoose from 'mongoose'
import { check } from 'express-validator'

const validateObjectId = (idName) => {
  return check(idName)
    .trim()
    .escape()
    .notEmpty()
    .withMessage(`${idName} can't be empty.`)
    .bail()
    .isMongoId()
    .withMessage(`Invalid ${idName} format.`)
    .bail() // stops execution of current chain if there's an error
    .customSanitizer((id) => new mongoose.Types.ObjectId(String(id)))
}

export default validateObjectId
