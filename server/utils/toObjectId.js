import mongoose from 'mongoose'

const toObjectId = (id) => {
  try {
    return new mongoose.Types.ObjectId(String(id))
  } catch (err) {
    throw new Error(`Error parsing id to ObjectId: ${err}`)
  }
}

export default toObjectId
