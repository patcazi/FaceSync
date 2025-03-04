import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import SourceImagePage from './components/pages/SourceImagePage'
import TargetVideoPage from './components/pages/TargetVideoPage'
import ResultsPage from './components/pages/ResultsPage'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload-image" element={<SourceImagePage />} />
        <Route path="/upload-video" element={<TargetVideoPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
