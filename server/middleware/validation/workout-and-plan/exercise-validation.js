import { body } from 'express-validator'
import validateObjectId from '../object-id-validation.js'
import validateString from '../string-validation.js'
import validateInt from '../number-validation.js'

export const validateExercises = () => [
  body('exercises')
    .isArray({ min: 1 })
    .withMessage('Exercises must be a non-empty array.'),

  validateObjectId('exercises.*.exerciseId'),

  body('exercises.*.sets')
    .isArray({ min: 1 })
    .withMessage('Each exercise must have a non-empty sets array.'),

  validateInt('exercises.*.sets.*.reps', true),

  validateInt('exercises.*.restSecondsBetweenSets', false),

  validateString('exercises.*.notes', 255, false),
]
