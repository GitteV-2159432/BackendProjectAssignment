import Exercise from '../models/Exercise.js'
import fetchFromWger from '../utils/wgerFetcher.js'
import { createGenericService } from './generic-service.js'

const genExerciseService = createGenericService(Exercise)

const populateExercises = async () => {
  const exerciseCount = await Exercise.countDocuments()
  if (exerciseCount > 0) {
    return
  }

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
        category: ex.category,
        muscles: ex.muscles,
        muscles_secondary: ex.muscles_secondary,
        equipment: ex.equipment,
        images: ex.images,
        videos: ex.videos,
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
    await Exercise.insertMany(allExercises, { ordered: false })
    console.log(`Inserted ${allExercises.length} exercises.`)
  } catch (err) {
    console.error('Error inserting exercises:', err)
  }
}

export const exerciseService = {
  populateExercises,
  getAll: genExerciseService.getAll,
  getById: genExerciseService.getById,
}
