import { Menu, X, Bot, Search } from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Sidebar from './Sidebar'

export default function MobileNav({ onLogout, onOpenGraph, onOpenHome, onOpenSettings, onOpenRecent, onOpenCreate, activePage }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="md:hidden">
      {/* Mobile Top Bar */}
      <header className="h-16 bg-[#050505] border-b border-slate-800 flex items-center justify-between px-6 z-50 relative">
        <div className="flex items-center gap-2">
          <Bot className="w-6 h-6 text-indigo-400" />
          <span className="font-bold text-lg tracking-tight">Peblo AI</span>
        </div>
        <button 
          onClick={() => setIsOpen(true)}
          className="p-2 text-slate-400 hover:text-white transition-colors"
        >
          <Menu size={24} />
        </button>
      </header>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-72 bg-black border-r border-slate-800 z-[70]"
            >
              <div className="p-6 flex flex-col h-full">
                <div className="flex items-center justify-between mb-10">
                  <div className="flex items-center gap-2">
                    <Bot className="w-6 h-6 text-indigo-400" />
                    <span className="font-bold text-lg tracking-tight">Peblo AI</span>
                  </div>
                  <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-white">
                    <X size={24} />
                  </button>
                </div>

                <div onClick={() => setIsOpen(false)}>
                  <Sidebar 
                    onLogout={onLogout}
                    onOpenGraph={onOpenGraph}
                    onOpenHome={onOpenHome}
                    onOpenSettings={onOpenSettings}
                    onOpenRecent={onOpenRecent}
                    onOpenCreate={onOpenCreate}
                    activePage={activePage}
                  />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
