import categoryService from '../services/category-service.js'

const getCategories = async (req, res) => {
  const categories = await categoryService.getAll()

  return res.json(
    categories
      ? categories.map((cat) => {
          return { id: cat._id, name: cat.name }
        })
      : []
  )
}

const getCategory = async (req, res) => {
  const category = await categoryService.getById(req.params.id)
  return res.json(
    category
      ? {
          id: category._id,
          name: category.name,
        }
      : {}
  )
}

export { getCategories, getCategory }
