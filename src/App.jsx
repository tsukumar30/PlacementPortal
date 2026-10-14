import { Routes, Route, Navigate } from 'react-router-dom'

import './App.css'

import Home from './pages/Home'
import Jobs from './pages/Jobs'
import About from './pages/About'
import Login from './pages/Login'
import Contact from './pages/Contact'
import Dashboard from './pages/Dashboard'
import Applications from './pages/Applications'
import Profile from './pages/Profile'
import JobDetails from './pages/JobDetails'
import Apply from './pages/Apply'
import Register from './pages/Register'
import Admin from './pages/Admin'
import AdminApplications from './pages/AdminApplications'
import AdminJobs from './pages/AdminJobs'
import AdminStudents from './pages/AdminStudents'
import AdminLogin from './pages/AdminLogin'

function ProtectedRoute({ children }) {
  const loggedInUser = localStorage.getItem('loggedInUser')

  if (!loggedInUser) {
    return <Navigate to="/login" replace />
  }

  return children
}

function AdminProtectedRoute({ children }) {
  const adminLoggedIn =
    localStorage.getItem('adminLoggedIn')

  if (adminLoggedIn !== 'true') {
    return <Navigate to="/admin-login" replace />
  }

  return children
}

function App() {
  return (
    <Routes>

      <Route path="/" element={<Home />} />

      <Route path="/jobs" element={<Jobs />} />

      <Route path="/about" element={<About />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/contact" element={<Contact />} />

      {/* Protected Student Pages */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/applications"
        element={
          <ProtectedRoute>
            <Applications />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route path="/jobs/:id" element={<JobDetails />} />

      <Route
        path="/apply/:id"
        element={
          <ProtectedRoute>
            <Apply />
          </ProtectedRoute>
        }
      />

      <Route
  path="/admin"
  element={
    <AdminProtectedRoute>
      <Admin />
    </AdminProtectedRoute>
  }
/>

<Route
  path="/admin/jobs"
  element={
    <AdminProtectedRoute>
      <AdminJobs />
    </AdminProtectedRoute>
  }
/>

<Route
  path="/admin/students"
  element={
    <AdminProtectedRoute>
      <AdminStudents />
    </AdminProtectedRoute>
  }
/>

<Route
  path="/admin/applications"
  element={
    <AdminProtectedRoute>
      <AdminApplications />
    </AdminProtectedRoute>
  }
/>

      

      
 

    

<Route
  path="/admin-login"
  element={<AdminLogin />}
/>

    </Routes>
  )
}

export default App