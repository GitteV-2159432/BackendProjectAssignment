import User from '../models/User.js'
import { createGenericService } from './components/generic-service.js'

const userService = createGenericService(User)

export default userService
