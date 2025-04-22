import fetchFromWger from '../utils/wgerFetcher.js'

const getExercises = async (req, res) => {
  const { category, limit, offset } = req.query

  try {
    const data = await fetchFromWger('exerciseinfo', {
      category,
      limit,
      offset,
    })
    return res.json(data)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch exercises from Wger' })
  }
}

export { getExercises }
