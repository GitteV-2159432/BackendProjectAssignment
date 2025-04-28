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

    async getByQuery(query, sortQuery) {
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
      const document = await Model.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
      })

      if (!document) {
        throw new HttpError(404, `${modelName} not found.`)
      }

      return document
    },

    async remove(id) {
      return await Model.findByIdAndDelete(id)
    },

    async checkPermission(modelId, userId) {
      const document = await this.getById(modelId)

      if (!document.userId.equals(userId)) {
        throw new HttpError(
          403,
          `You do not have permission to access this ${modelName.toLowerCase()}.`
        )
      }
    },
  }
}
