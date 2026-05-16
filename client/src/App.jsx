import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import AuthPage from './pages/AuthPage'
import DashboardPage from './pages/DashboardPage'
import EditorPage from './pages/EditorPage'
import GraphPage from './pages/GraphPage'
import SettingsPage from './pages/SettingsPage'
import './index.css'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLogin, setIsLogin] = useState(true)
  const [view, setView] = useState('dashboard') // 'dashboard', 'editor', 'graph', or 'settings'

  const handleAuth = (e) => {
    e.preventDefault()
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setView('dashboard')
  }

  const pageVariants = {
    initial: { opacity: 0, x: -10 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 10 }
  }

  return (
    <AnimatePresence mode="wait">
      {!isLoggedIn ? (
        <motion.div 
          key="auth"
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.3 }}
        >
          <AuthPage 
            isLogin={isLogin} 
            setIsLogin={setIsLogin} 
            onAuth={handleAuth} 
          />
        </motion.div>
      ) : (
        <motion.div
          key={view}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.3 }}
          className="h-full"
        >
          {view === 'dashboard' ? (
            <DashboardPage 
              onLogout={handleLogout} 
              onOpenNote={() => setView('editor')} 
              onOpenGraph={() => setView('graph')} 
              onOpenSettings={() => setView('settings')}
            />
          ) : view === 'graph' ? (
            <GraphPage onLogout={handleLogout} onBack={() => setView('dashboard')} />
          ) : view === 'settings' ? (
            <SettingsPage onLogout={handleLogout} onBack={() => setView('dashboard')} />
          ) : (
            <EditorPage onLogout={handleLogout} onBack={() => setView('dashboard')} />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default App
