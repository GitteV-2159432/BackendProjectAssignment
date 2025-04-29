import mongoose from 'mongoose'

import User from '../../models/User.js'
import HttpError from '../../utils/httpError.js'

const userIdToObjectId = async (req, res, next) => {
  console.log(req)
  if (req.user && req.user.userId) {
    try {
      const userObjectId = new mongoose.Types.ObjectId(String(req.user.userId))
      if (!(await User.findById(userObjectId))) {
        throw new HttpError(404, 'User not found.')
      }

      req.userObjectId = userObjectId
    } catch (err) {
      throw new HttpError(400, 'Invalid user Id format.')
    }
  }
  next()
}

export default userIdToObjectId
