import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import PublicRoute from './components/PublicRoute.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import Account from './pages/Account.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Exercises from './pages/Exercises.jsx'
import Home from './pages/Home.jsx'
import Layout from './pages/Layout.jsx'
import Login from './pages/Login.jsx'
import Plans from './pages/Plans.jsx'
import Register from './pages/Register.jsx'
import Workouts from './pages/Workouts.jsx'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route index element={<Home />} />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route path="/" element={<Layout />}>
            <Route
              path="dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="plans"
              element={
                <ProtectedRoute>
                  <Plans />
                </ProtectedRoute>
              }
            />
            <Route
              path="workouts"
              element={
                <ProtectedRoute>
                  <Workouts />
                </ProtectedRoute>
              }
            />
            <Route
              path="exercises"
              element={
                <ProtectedRoute>
                  <Exercises />
                </ProtectedRoute>
              }
            />
            <Route
              path="account"
              element={
                <ProtectedRoute>
                  <Account />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
