import { useState, useEffect } from 'react'
import { FileText, Clock, Search, Grid } from 'lucide-react'
import { motion } from 'framer-motion'

export default function RecentNotesPage({ onOpenNote }) {
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const token = localStorage.getItem('peblo_token')
        const res = await fetch('http://localhost:5000/api/notes', {
          headers: { 'Authorization': `Bearer ${token}` }
        })
        const data = await res.json()
        if (res.ok) setNotes(data)
      } catch (err) {
        console.error('Fetch failed:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchNotes()
  }, [])

  return (
    <div className="h-full flex flex-col bg-[#050505] overflow-hidden">
      {/* Header */}
      <header className="h-20 border-b border-slate-800 flex items-center justify-between px-10">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold tracking-tight text-white">Recent Notes</h1>
          <span className="text-[10px] font-bold bg-slate-900 border border-slate-800 text-slate-500 px-2 py-0.5 rounded uppercase tracking-widest">
            {notes.length} Active Nodes
          </span>
        </div>
        <div className="relative group w-72">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
          <input 
            type="text" 
            placeholder="Search nodes..."
            className="w-full bg-slate-900/50 border border-slate-800 rounded-xl py-2 pl-11 pr-4 text-sm outline-none focus:border-indigo-500/50 transition-all"
          />
        </div>
      </header>

      {/* List Content */}
      <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
        <div className="max-w-5xl mx-auto">
          <div className="bg-[#0A0A0A] border border-slate-800/60 rounded-2xl overflow-hidden shadow-2xl">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-slate-900/30 border-b border-slate-800 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              <div className="col-span-6">Name</div>
              <div className="col-span-2">Category</div>
              <div className="col-span-2">Last Edited</div>
              <div className="col-span-2 text-right">Size</div>
            </div>

            {/* Table Rows */}
            <div className="divide-y divide-slate-800/50">
              {notes.map((note, index) => (
                <motion.div 
                  key={note._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => onOpenNote(note._id)}
                  className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-slate-900/30 transition-all group cursor-pointer"
                >
                  <div className="col-span-6 flex items-center gap-4">
                    <div className="bg-slate-800/50 p-2 rounded-lg text-slate-400 group-hover:bg-indigo-500/10 group-hover:text-indigo-400 transition-all">
                      <FileText size={18} />
                    </div>
                    <span className="font-semibold text-sm group-hover:text-indigo-300 transition-colors">{note.title}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-[10px] font-bold bg-slate-900 border border-slate-800 text-slate-400 px-2 py-0.5 rounded uppercase tracking-tight">
                      {note.category || 'General'}
                    </span>
                  </div>
                  <div className="col-span-2 text-sm text-slate-500 flex items-center gap-2">
                    <Clock size={14} />
                    {new Date(note.updatedAt).toLocaleDateString()}
                  </div>
                  <div className="col-span-2 text-right text-xs text-slate-600 font-medium font-mono">
                    {Math.round(JSON.stringify(note).length / 1024)} kb
                  </div>
                </motion.div>
              ))}
              
              {!loading && notes.length === 0 && (
                <div className="p-20 text-center text-slate-600 italic">
                  No recent notes found.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
