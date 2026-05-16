import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import AuthPage from './pages/AuthPage'
import DashboardPage from './pages/DashboardPage'
import EditorPage from './pages/EditorPage'
import GraphPage from './pages/GraphPage'
import SettingsPage from './pages/SettingsPage'
import RecentNotesPage from './pages/RecentNotesPage'
import Sidebar from './components/dashboard/Sidebar'
import './index.css'

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLogin, setIsLogin] = useState(true)
  const [view, setView] = useState('dashboard') // dashboard, editor, graph, settings, recent-notes
  const [selectedNoteId, setSelectedNoteId] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('peblo_token')
    if (token) {
      setIsLoggedIn(true)
    }
  }, [])

  const handleAuth = (e) => {
    if (e) e.preventDefault()
    setIsLoggedIn(true)
    setView('dashboard')
  }

  const handleLogout = () => {
    localStorage.removeItem('peblo_token')
    localStorage.removeItem('peblo_user')
    setIsLoggedIn(false)
    setView('dashboard')
    setSelectedNoteId(null)
  }

  const handleOpenNote = (id) => {
    setSelectedNoteId(id)
    setView('editor')
  }

  const handleCreateNote = () => {
    setSelectedNoteId(null)
    setView('editor')
  }

  const pageVariants = {
    initial: { opacity: 0, x: 10 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -10 }
  }

  if (!isLoggedIn) {
    return (
      <AnimatePresence mode="wait">
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
      </AnimatePresence>
    )
  }

  const activeLabel = {
    'dashboard': 'Home',
    'recent-notes': 'Recent Notes',
    'graph': 'Categories',
    'settings': 'Settings',
    'editor': 'Editor'
  }[view]

  return (
    <div className="flex h-screen bg-black overflow-hidden">
      {/* Global Navigation Sidebar */}
      <Sidebar 
        activePage={activeLabel}
        onLogout={handleLogout}
        onOpenHome={() => setView('dashboard')}
        onOpenRecent={() => setView('recent-notes')}
        onOpenGraph={() => setView('graph')}
        onOpenSettings={() => setView('settings')}
        onOpenCreate={handleCreateNote}
      />

      {/* Main Content Area */}
      <main className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={view + (selectedNoteId || '')}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            {view === 'dashboard' ? (
              <DashboardPage 
                onOpenNote={handleOpenNote} 
                onOpenGraph={() => setView('graph')} 
              />
            ) : view === 'graph' ? (
              <GraphPage onBack={() => setView('dashboard')} />
            ) : view === 'settings' ? (
              <SettingsPage onBack={() => setView('dashboard')} />
            ) : view === 'recent-notes' ? (
              <RecentNotesPage onBack={() => setView('dashboard')} onOpenNote={handleOpenNote} />
            ) : (
              <EditorPage onBack={() => setView('dashboard')} noteId={selectedNoteId} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}
