import { check, query } from 'express-validator'
import validateBoolean from './booleanValidation.js'

const validateGetAllQueryParams = () => {
  const isPublicValidation = validateBoolean('isPublic', true)

  const bookmarkValidation = query('bookmark').custom((value, { req }) => {
    const { isPublic } = req.query

    if (isPublic) {
      if (value === undefined) throw new Error('bookmark is required')

      if (typeof value !== Boolean && (value !== 'true' || value !== 'false'))
        throw new Error('bookmark must be true or false')
    }

    return true
  })

  return [...isPublicValidation, bookmarkValidation]
}

export { validateGetAllQueryParams }
