import { useState } from 'react'
import AuthPage from './pages/AuthPage'
import DashboardPage from './pages/DashboardPage'
import EditorPage from './pages/EditorPage'
import './index.css'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLogin, setIsLogin] = useState(true)
  const [view, setView] = useState('dashboard') // 'dashboard' or 'editor'

  const handleAuth = (e) => {
    e.preventDefault()
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setView('dashboard')
  }

  return (
    <>
      {!isLoggedIn ? (
        <AuthPage 
          isLogin={isLogin} 
          setIsLogin={setIsLogin} 
          onAuth={handleAuth} 
        />
      ) : view === 'dashboard' ? (
        <DashboardPage onLogout={handleLogout} onOpenNote={() => setView('editor')} />
      ) : (
        <EditorPage onLogout={handleLogout} onBack={() => setView('dashboard')} />
      )}
    </>
  )
}

export default App
