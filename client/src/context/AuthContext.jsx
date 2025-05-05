import { createContext, useState, useEffect } from 'react'
import fetchWithAuth from '../utils/fetchWithAuth.js'
import { jwtDecode } from 'jwt-decode'


const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null)
  const [userId, setUserId] = useState(null)

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token)
      setUserId(decoded.userId || null)
    } else {
      setUserId(null)
    }
  }, [token])

  const login = (token) => {
    localStorage.setItem('token', token)
    setToken(token)
    console.log('Token set in localStorage:', token)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setUserId(null)
    console.log('Token removed from localStorage')
  }

  const getUser = async () => {
    if (!token || !userId) return null

    const { result, error } = await fetchWithAuth(`/users/${userId}`, logout)
    if (error) {
      console.error('Failed to fetch user:', error)
      return null
    }

    return result
  }

  return (
    <AuthContext.Provider value={{ token, login, logout, getUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
