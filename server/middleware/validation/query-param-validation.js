import { query } from 'express-validator'
import validateObjectId from './object-id-validation.js'

/**
 * Validates the query parameters for the "get all" API request for workouts and plans.
 * This function checks for the presence and validity of the query parameters (isPublic, bookmark).
 *
 * 'isPublic' must be a boolean.
 * if 'isPublic' is true, the 'bookmark' parameter is required and must also be a boolean.
 *
 * @returns {ValidationChain[]} An array of validation chains for the query parameters.
 */
const validateGetAllQueryParams = () => {
  const isPublicValidation = query('isPublic')
    .exists()
    .withMessage('isPublic is required.')
    .bail()
    .isBoolean()
    .withMessage('isPublic must be true or false.')
    .toBoolean()

  const bookmarkValidation = query('bookmark')
    .custom((bookmark, { req }) => {
      const isPublic = ['true', '1', 'on'].includes(
        String(req.query.isPublic).toLowerCase()
      )

      if (isPublic) {
        if (bookmark === undefined) throw new Error('bookmark is required.')

        const isValid = ['true', '1', 'on', 'false', '0', 'off'].includes(
          String(bookmark).toLowerCase()
        )
        if (!isValid) throw new Error('bookmark must be true or false.')
      }

      return true
    })
    .toBoolean()

  return [isPublicValidation, bookmarkValidation]
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

export { validateGetAllQueryParams, validateGetAllExercisesQueryParams }
