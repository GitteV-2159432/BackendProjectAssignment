import express from 'express'
import {
    getExercises,
    getExercise,
    addBookmark,
    deleteBookmark,
    deleteExercise,
    updateExercise
} from '../controllers/exercise-controller.js'
import userIdToObjectId from '../middleware/validation/user-id-to-object-id.js'
import validateObjectId from '../middleware/validation/object-id-validation.js'
import validate from '../middleware/validation/validation.js'
import { validateGetAllExercisesQueryParams } from '../middleware/validation/query-param-validation.js'
import validateUpdate from '../middleware/validation/exercise/update-validation.js'

const router = express.Router()

router.get(
    '/',
    userIdToObjectId,
    [...validateGetAllExercisesQueryParams(), validate],
    getExercises
)

router.get( 
    '/:id',
    userIdToObjectId,
    [validateObjectId('id'), validate],
    getExercise
)

router.post('/:id/bookmark', addBookmark)

router.delete('/:id/bookmark', deleteBookmark)

router.delete(
    '/:id',
    userIdToObjectId,
    [validateObjectId('id'), validate],
    deleteExercise
)

router.patch(
    '/:id',
    userIdToObjectId,
    [...validateUpdate(), validate],
    updateExercise
)

export default router
