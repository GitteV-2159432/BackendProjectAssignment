import axios from 'axios'
import cache from './cache.js'

const WGER_API_BASE = 'https://wger.de/api/v2'

async function fetchFromWger(endpoint, params = {}, useCache = false) {
  if (useCache) {
    const cached = cache.get(endpoint)
    if (cached) {
      return cached
    }
  }

  try {
    console.log(`Fetching: ${WGER_API_BASE}/${endpoint} with params`, params)

    const response = await axios.get(`${WGER_API_BASE}/${endpoint}`, {
      params: params,
      headers: {
        Accept: 'application/json',
      },
    })

    const data = response.data

    if (useCache) {
      cache.set(endpoint, data)
    }

    return data
  } catch (error) {
    console.error(`Error fetching from Wger API: ${error.message}`)
    throw error
  }
}

export default fetchFromWger
