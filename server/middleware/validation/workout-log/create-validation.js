import { body } from 'express-validator'

import validateObjectId from '../object-id-validation.js'

const createValidation = () => {
  return [
    validateObjectId('workoutId'),

    body('exercises')
      .isArray({ min: 1 })
      .withMessage(`Exercises has to be non-empty array.`),

    validateObjectId('exercises.*.exerciseId'),

    body('durationInMinutes')
      .trim()
      .escape()
      .notEmpty()
      .withMessage("durationInMinutes can't be empty.")
      .bail()
      .isInt({ min: 1 })
      .withMessage(`durationInMinutes has to be a number.`),
  ]
}

export default createValidation
