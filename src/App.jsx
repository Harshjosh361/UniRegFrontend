import { Routes, Route } from 'react-router-dom'
import Landing from "./Components/Landing.jsx"
import Login from "./Components/Login.jsx"
import StudentLogin from "./Components/StudentLogin.jsx"
import AdminLogin from "./Components/AdminLogin.jsx"
import StudentRegistration from "./Components/StudentRegistration.jsx"
import './App.css'
import StudentDashboard from './Components/StudentDashboard.jsx'
import AdminDashboard from './Components/AdminDashboard.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/student-login" element={<StudentLogin />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/student/register" element={<StudentRegistration />} />
      <Route path="/student-dashboard" element={<StudentDashboard />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/unauthorized" element={<div>Unauthorized access</div>} />
      Route
    </Routes>
  )
}

export default App
