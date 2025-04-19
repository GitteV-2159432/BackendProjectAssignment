import axios from "axios"

const WGER_API_BASE = 'https://wger.de/api/v2';

async function fetchFromWger(endpoint, params = {}) {
  try {
    const response = await axios.get(`${WGER_API_BASE}/${endpoint}`, {
      params: params,
      headers: {
        'Accept': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching from Wger API: ${error.message}`);
    throw error;
  }
}

export { fetchFromWger }