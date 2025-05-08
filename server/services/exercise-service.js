import Category from '../models/Category.js'
import Exercise from '../models/Exercise.js'
import Muscle from '../models/Muscle.js'
import HttpError from '../utils/http-error.js'
import fetchFromWger from '../utils/wger-fetcher.js'
import createBookmarkService from './bookmark-service.js'
import createGenericService from './components/generic-service.js'

const exerciseService = createGenericService(Exercise)
const bookmarkService = createBookmarkService(Exercise)

exerciseService.populateExercises = async () => {
  const exerciseCount = await Exercise.countDocuments()
  if (exerciseCount > 0) {
    return
  }

  const categories = await Category.find()
  const categoryMap = {}
  categories.forEach((cat) => {
    categoryMap[cat.wgerId] = cat._id
  })

  const muscles = await Muscle.find()
  const muscleMap = {}
  muscles.forEach((muscle) => {
    muscleMap[muscle.wgerId] = muscle._id
  })

  const allExercises = []
  let offset = 0
  const limit = 100
  let more = true

  while (more) {
    const response = await fetchFromWger('exerciseinfo', {
      limit,
      offset,
      order: 'id',
    })

    if (!response || !response.results || response.results.length === 0) {
      more = false
      break
    }

    const mappedExercises = response.results.map((ex) => {
      const enTranslation = ex.translations.find((t) => t.language === 2)

      return {
        id: ex.id,
        uuid: ex.uuid,
        name: enTranslation?.name || '',
        description: enTranslation?.description || '',
        category: categoryMap[ex.category.id],
        muscles: ex.muscles.map((m) => muscleMap[m.id]).filter(Boolean),
        muscles_secondary: ex.muscles_secondary
          .map((m) => muscleMap[m.id])
          .filter(Boolean),
        equipment: ex.equipment.map((eq) => eq.name),
        images: ex.images
          .sort((a, b) => b.is_main - a.is_main) // sort, so main img is always first
          .map((img) => img.image),
      }
    })

    const filteredExercises = mappedExercises.filter(
      (ex) =>
        ex.name &&
        ex.description &&
        ex.muscles.length > 0 &&
        ex.category &&
        ex.equipment.length > 0 &&
        ex.images.length > 0
    )

    allExercises.push(...filteredExercises)

    offset += limit
    more = !!response.next
  }

  try {
    await Exercise.insertMany(allExercises)
    console.log(`Inserted ${allExercises.length} exercises.`)
  } catch (err) {
    console.error('Error inserting exercises:', err)
  }
}

exerciseService.checkPermission = async (currentUserId) => {
  // Check if user is admin
  const currentUser = await userService.getById(currentUserId)
  if (currentUser.role !== 'admin') {
    throw new HttpError(403, 'Admin permission required.')
  }
}

exerciseService.setBookmark = async (exerciseId, userId) => {
  return await bookmarkService.setBookmark(exerciseId, userId)
}

exerciseService.removeBookmark = async (exerciseId, userId) => {
  return await bookmarkService.removeBookmark(exerciseId, userId)
}

export default exerciseService
