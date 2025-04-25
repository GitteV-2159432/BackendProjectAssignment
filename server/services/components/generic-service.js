export function createGenericService(Model) {
  return {
    async getAll() {
      return await Model.find()
    },

    async getById(id) {
      return await Model.findById(id)
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
