import express from 'express'
import {
    getUsers, 
    getUser,
    deleteUser,
    updateUser
} from '../controllers/user-controller.js'
import userIdToObjectId from '../middleware/validation/user-id-to-object-id.js'
import validateObjectId from '../middleware/validation/object-id-validation.js'
import validate from '../middleware/validation/validation.js'

const router = express.Router()

router.get(
    '/',
    userIdToObjectId,
    getUsers
)

router.get( 
    '/:id',
    userIdToObjectId,
    [validateObjectId('id'), validate],
    getUser
)

router.delete(
    '/:id',
    userIdToObjectId,
    [validateObjectId('id'), validate],
    deleteUser
)


export default router
