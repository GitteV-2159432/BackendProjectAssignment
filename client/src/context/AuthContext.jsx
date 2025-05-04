import { createContext, useState } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(sessionStorage.getItem('token') || null)

  const login = (token) => {
    sessionStorage.setItem('token', token)
    setToken(token)
    console.log('Token set in sessionStorage:', token)
  }

  const logout = () => {
    sessionStorage.removeItem('token')
    setToken(null)
  }

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
