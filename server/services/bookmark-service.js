import createGenericService from './components/generic-service.js'
import userService from './user-service.js'
import HttpError from '../utils/http-error.js'

const createBookmarkService = (Model) => {
  const modelName = Model.modelName || 'Document'
  const modelNamePl = `${modelName}s`
  const modelService = createGenericService(Model)

  const getModelBookmarkIds = async (modelId, userId) => {
    const document = await modelService.getById(modelId)

    if (modelName != 'Exercise') {
      if (!document.isPublic) {
        throw new HttpError(
          400,
          `Only public ${modelNamePl.toLowerCase()} can be bookmarked.`
        )
      }
    }

    return (await userService.getById(userId)).bookmarks[
      modelNamePl.toLowerCase()
    ]
  }

  const setModifiedModelBookmarkIds = async (
    modifiedModelBookmarkIds,
    userId
  ) => {
    await userService.update(userId, {
      [`bookmarks.${modelNamePl.toLowerCase()}`]: modifiedModelBookmarkIds,
    })
  }

  return {
    async setBookmark(modelId, userId) {
      const modelBookmarkIds = await getModelBookmarkIds(modelId, userId)
      const modifiedModelBookmarkIds = modelBookmarkIds.includes(modelId)
        ? modelBookmarkIds
        : [...modelBookmarkIds, modelId]

      await setModifiedModelBookmarkIds(modifiedModelBookmarkIds, userId)

      if (modelName != 'Exercise') {
        return modelService.getAll(
          {
            isPublic: true,
            _id: {
              $nin: (await userService.getById(userId)).bookmarks[
                modelNamePl.toLowerCase()
              ],
            },
          },
          { name: 1 }
        )
      } else {
        return modelService.getAll(
          {
            _id: {
              $in: (await userService.getById(userId)).bookmarks[
                modelNamePl.toLowerCase()
              ],
            },
          },
          { name: 1 }
        )
      }
    },

    async removeBookmark(modelId, userId) {
      const modelBookmarkIds = await getModelBookmarkIds(modelId, userId)
      const modifiedModelBookmarkIds = modelBookmarkIds.filter(
        (id) => !id.equals(modelId)
      )

      await setModifiedModelBookmarkIds(modifiedModelBookmarkIds, userId)

      if (modelName != 'Exercise') {
        return modelService.getAll(
          {
            isPublic: true,
            _id: {
              $in: (await userService.getById(userId)).bookmarks[
                modelNamePl.toLowerCase()
              ],
            },
          },
          { name: 1 }
        )
      } else {
        return modelService.getAll(
          {
            _id: {
              $in: (await userService.getById(userId)).bookmarks[
                modelNamePl.toLowerCase()
              ],
            },
          },
          { name: 1 }
        )
      }
    },
  }
}

export default createBookmarkService
