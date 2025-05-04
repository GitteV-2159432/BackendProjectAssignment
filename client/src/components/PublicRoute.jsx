import { Navigate } from 'react-router-dom'
import useAuth from '../context/useAuth.js'

const PublicRoute = ({ children }) => {
  const { token } = useAuth()
  return token ? <Navigate to="/dashboard" /> : children
}

export default PublicRoute
