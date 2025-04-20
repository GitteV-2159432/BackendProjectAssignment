import fetchFromWger from '../utils/wgerFetcher.js'

const getExercises = async (req, res) => {
    const {
        language = 2, // 2 = English
        category,
        limit,
    } = req.query

    const params = { language }
    if (category) params.category = category
    if (limit) params.limit = limit

    try {
        const data = await fetchFromWger('exercise', params)
        return res.json(data)
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch exercises from Wger' })
    }
}

export { getExercises }
