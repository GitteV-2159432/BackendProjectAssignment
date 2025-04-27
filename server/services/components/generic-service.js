import HttpError from '../../utils/httpError.js'

export default function createGenericService(Model) {
  const modelName = Model.modelName || 'Document'

  return {
    async getAll(query, sortQuery) {
      return await Model.find(query).sort(sortQuery)
    },

    async getById(id) {
      const document = await Model.findById(id)
      if (!document) {
        throw new HttpError(404, `${modelName} not found.`)
      }

      return document
    },

    async getWorkoutByQuery(query, sortQuery) {
      const document = await Model.findOne(query).sort(sortQuery)
      if (!document) {
        throw new HttpError(404, `${modelName} not found.`)
      }

      return document
    },

    async create(data) {
      const newItem = new Model(data)
      return await newItem.save()
    },

    async update(id, data) {
      return await Model.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
      })
    },

    async remove(id) {
      return await Model.findByIdAndDelete(id)
    },
  }
}
