const fetchWithAuth = async (
  endpoint,
  logout,
  { method = 'GET', body = null, headers = {}, query = {} } = {}
) => {
  const token = localStorage.getItem('token')

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
    return { result }
  } catch (error) {
    return { error }
  }
}

export default fetchWithAuth
