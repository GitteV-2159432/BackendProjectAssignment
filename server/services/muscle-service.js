import Muscle from '../models/Muscle.js'
import fetchFromWger from '../utils/wger-fetcher.js'
import createGenericService from './components/generic-service.js'

const muscleService = createGenericService(Muscle)

muscleService.populateMuscles = async () => {
  const muscleCount = await Muscle.countDocuments()
  if (muscleCount > 0) {
    return
  }

  const response = await fetchFromWger('muscle', {})

  const muscles = response.results.map((muscle) => {
    return {
      wgerId: muscle.id,
      name: muscle.name,
      name_en: muscle.name_en,
      image_url_main: muscle.image_url_main,
      image_url_secondary: muscle.image_url_secondary,
    }
  })

  try {
    await Muscle.insertMany(muscles)
    console.log(`Inserted ${muscles.length} muscles.`)
  } catch (err) {
    console.error('Error inserting muscles:', err)
  }
}

export default muscleService
