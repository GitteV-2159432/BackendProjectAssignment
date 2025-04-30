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
import Layout from './pages/Layout.jsx'

function App() {
  return (
    <AuthProvider>
      <Router>
          <Routes>
            <Route path="/" element={<Layout />} >
              <Route path="dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }/>
              <Route path="plans" element={<Plans />} />
              <Route path="workouts" element={<Workouts />} />
              <Route path="account" element={<Account />} />
            </Route>

            <Route index element={<Home />} />  
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
          </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
