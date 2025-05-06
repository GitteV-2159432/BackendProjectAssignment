/**
 * Makes an authenticated HTTP request to a specified API endpoint using fetch.
 *
 * @param {string} endpoint - The API endpoint to call, e.g., "/workouts".
 * @param {Function} logout - A function to be called if the user is unauthorized (401).
 * @param {Object} [options] - Optional configuration for the request.
 * @param {string} [options.method='GET'] - The HTTP method to use, e.g., 'GET', 'POST', 'DELETE'.
 * @param {Object|null} [options.body=null] - The request body (for POST, PUT requests).
 * @param {Object} [options.headers={}] - Additional headers to include in the request.
 * @param {Object} [options.query={}] - Query parameters to append to the URL as a query string.
 *
 * @returns {Promise<Object>} - An object containing either the `result` from the response
 *                              or an `error` if the request failed or was unauthorized.
 *
 * @example
 * const { result, error } = await fetchWithAuth('/workouts', logout, {
 *   method: 'POST',
 *   body: {
 *     name: 'New Workout'
 *     isPublic: true
 *  },
 * });
 */
const fetchWithAuth = async (
  endpoint,
  logout,
  { method = 'GET', body = null, headers = {}, query = {} } = {}
) => {
  const token = sessionStorage.getItem('token')

  const queryString = new URLSearchParams(query).toString()
  const url =
    'http://127.0.0.1:5000/api' +
    endpoint +
    (queryString ? `?${queryString}` : '')

  console.log(url)

  try {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        ...headers,
      },
      body: body ? JSON.stringify(body) : null,
    })

    if (response.status === 401) {
      logout()
      return { error: 'Unauthorized. Logged out.' }
    }

    const result = await response.json()

    if (!response.ok) {
      return { error: result.error.message }
    }

    return { result }
  } catch (error) {
    return { error }
  }
}

export default fetchWithAuth
