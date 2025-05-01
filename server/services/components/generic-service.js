import HttpError from '../../utils/http-error.js'

export default function createGenericService(Model) {
  const modelName = Model.modelName || 'Document'

  return {
    async getAll(query, sortQuery, projection) {
      return await Model.find(query, projection).sort(sortQuery)
    },

    async getById(id, projection = {}) {
      const document = await Model.findById(id, projection)
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

    async checkPermission(modelId, userId, readAccess = false) {
      const doc = await this.getById(modelId)
      const isOwner = doc.userId.equals(userId)

      if (
        (readAccess && !doc.isPublic && !isOwner) ||
        (!readAccess && !isOwner)
      ) {
        throw new HttpError(
          403,
          `You do not have permission to access this ${modelName.toLowerCase()}.`
        )
      }
    },
  }
}
