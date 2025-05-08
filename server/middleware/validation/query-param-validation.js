import { query } from 'express-validator'
import validateObjectId from './object-id-validation.js'

/**
 * Validates the query parameters for the "get all" API request for workouts and plans.
 * This function checks for the presence and validity of the query parameter (filter).
 *
 * 'isPublic' must be a boolean.
 * if 'isPublic' is true, the 'bookmark' parameter is required and must also be a boolean.
 *
 * @returns {ValidationChain} A validation chain for the query parameter.
 */
const validateGetAllFilterQueryParam = () => {
  return query('filter')
    .trim()
    .toLowerCase()
    .notEmpty()
    .withMessage(`'filter' is required.`)
    .bail()
    .isIn(['personal', 'bookmarked', 'public'])
    .withMessage(
      `'filter' has to have the value 'personal', 'bookmarked' or 'public'.`
    )
}

/**
 * Validates the query parameters for accessing and adding workouts to a specific day of a plan.
 * This function checks for the presence and validity of the query parameter (day).
 *
 * 'day' must be one of the seven days of a week.
 *
 * @returns {ValidationChain} A validation chain for the query parameter.
 */
const validateDayQueryParam = () => {
  return query('day')
    .trim()
    .toLowerCase()
    .notEmpty()
    .withMessage(`'day' is required.`)
    .bail()
    .isIn([
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
      'sunday',
    ])
    .withMessage(`'day' has to be one of the seven weekdays.`)
}

/**
 * Validates the query parameters for the "get all" API request for Exercises.
 * This function checks for the presence and validity of the query parameters (bookmark, categoryId).
 *
 * 'bookmark' must be a boolean.
 * 'categoryId' must be a valid ObjectId.
 *
 * @returns {ValidationChain[]} An array of validation chains for the query parameters.
 */
const validateGetAllExercisesQueryParams = () => {
  const bookmarkValidation = query('bookmark')
    .optional()
    .custom((bookmark) => {
      const isValid = ['true', '1', 'on', 'false', '0', 'off'].includes(
        String(bookmark).toLowerCase()
      )
      if (!isValid) throw new Error('bookmark must be true or false.')

      return true
    })
    .toBoolean()
  const categoryIdValidation = validateObjectId('categoryId').optional()

  return [bookmarkValidation, categoryIdValidation]
}

export {
  validateDayQueryParam,
  validateGetAllExercisesQueryParams,
  validateGetAllFilterQueryParam,
}
