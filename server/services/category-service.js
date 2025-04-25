import Category from '../models/Category.js'
import { createGenericService } from './components/generic-service.js'
import fetchFromWger from '../utils/wgerFetcher.js'

const categoryService = createGenericService(Category)

categoryService.populateCategories = async () => {
  const categoryCount = await Category.countDocuments()
  if (categoryCount > 0) {
    return
  }

  const response = await fetchFromWger('exercisecategory', {})

  const categories = response.results.map((cat) => {
    return {
      wgerId: cat.id,
      name: cat.name,
    }
  })

  try {
    await Category.insertMany(categories)
    console.log(`Inserted ${categories.length} categories.`)
  } catch (err) {
    console.error('Error inserting muscles:', err)
  }
}

export default categoryService
