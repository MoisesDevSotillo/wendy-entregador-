import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import LoginScreen from './components/LoginScreen'
import HomeScreen from './components/HomeScreen'
import DeliveryDetailsScreen from './components/DeliveryDetailsScreen'
import EarningsScreen from './components/EarningsScreen'
import ChatScreen from './components/ChatScreen'
import ProfileScreen from './components/ProfileScreen'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState({ id: 2, name: 'Entregador', rating: 4.8 }) // Dados simulados com ID
  const [isOnline, setIsOnline] = useState(false)

  const handleLogin = (userData) => {
    setIsLoggedIn(true)
    setUser(userData)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUser(null)
    setIsOnline(false)
  }

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route 
            path="/" 
            element={
              <HomeScreen 
                user={user} 
                onLogout={handleLogout}
                isOnline={isOnline}
                setIsOnline={setIsOnline}
              />
            } 
          />
          <Route path="/delivery/:id" element={<DeliveryDetailsScreen user={user} />} />
          <Route path="/earnings" element={<EarningsScreen user={user} />} />
          <Route path="/chat/:participantId" element={<ChatScreen user={user} />} />
          <Route 
            path="/profile" 
            element={
              <ProfileScreen 
                user={user} 
                onBack={() => window.history.back()} 
                onUpdateProfile={(data) => setUser({...user, ...data})} 
              />
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

