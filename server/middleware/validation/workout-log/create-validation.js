import { body } from 'express-validator'

import objectIdValidation from '../object-id-validation.js'

const createValidation = () => {
  return [
    ...objectIdValidation('workoutId'),

    body('exercises')
      .isArray({ min: 1 })
      .withMessage(`Exercises has to be non-empty array.`),

    ...objectIdValidation('exercises.*.exerciseId'),

    body('durationInMinutes')
      .trim()
      .escape()
      .notEmpty()
      .withMessage("durationInMinutes can't be empty.")
      .isInt({ min: 1 })
      .withMessage(`durationInMinutes has to be a number.`),
  ]
}

export default createValidation
