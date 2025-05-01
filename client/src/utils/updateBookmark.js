import fetchWithAuth from './fetchWithAuth.js'

/**
 * Helper function for (un)bookmarking a resource by its ID.
 *
 * Sends a POST request to bookmark or a DELETE request to unbookmark.
 *
 * @param {string} ressourceEndpoint - The base endpoint of the resource, e.g., '/workouts'.
 * @param {string} id - The ID of the document to (un)bookmark.
 * @param {Function} logout - The logout function from the auth context, triggered on 401.
 * @param {boolean} [del=false] - If true, sends a DELETE request to remove the bookmark;
 *                                otherwise, sends a POST request to add it.
 *
 * @returns {Promise<{ result?: any, error?: any }>} - The result of the API call or an error object.
 *
 * @example
 * const { result, error } = await updateBookmark('/workouts', '6810beb676daac790e6b9c01', logout, true)
 */
const updateBookmark = async (ressourceEndpoint, id, logout, del = false) => {
  const fullEndpoint = `${ressourceEndpoint}/${id}/bookmark`

  try {
    const { result, error } = await fetchWithAuth(fullEndpoint, logout, {
      method: del ? 'DELETE' : 'POST',
    })
    return { result, error }
  } catch (error) {
    return { error }
  }
}

export default updateBookmark
