import { Navigate } from 'react-router-dom'
import useAuth from '../context/useAuth.js'

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth()
  return token ? children : <Navigate to="/login" />
}

export default ProtectedRoute
