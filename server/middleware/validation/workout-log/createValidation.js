import { check } from 'express-validator'
import objectIdValidation from '../objectIdValidation.js'

const createValidation = () => {
  return [
    ...objectIdValidation('userId'),
    ...objectIdValidation('workoutId'),

    check('exercises')
      .isArray({ min: 1 })
      .withMessage(`Exercises has to be non-empty array.`),

    ...objectIdValidation('exercises.*.exerciseId'),

    check('durationInMinutes')
      .trim()
      .escape()
      .notEmpty()
      .withMessage("durationInMinutes can't be empty.")
      .isInt({ min: 1 })
      .withMessage(`durationInMinutes has to be a number.`),
  ]
}

export default createValidation
