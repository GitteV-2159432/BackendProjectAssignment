import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/Dashboard.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import Plans from './pages/Plans.jsx'
import Workouts from './pages/Workouts.jsx'
import Home from './pages/Home.jsx'
import Account from './pages/Account.jsx'
import Navbar from './components/navbar/NavBar.jsx'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div style={{ display: 'flex', minHeight: '100vh' }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />


            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/plans" element={<Plans />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/account" element={<Account />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
