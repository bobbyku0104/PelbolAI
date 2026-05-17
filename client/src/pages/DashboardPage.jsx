import { FileText, Share2, Target, Grid, Clock, Plus, FlaskConical } from 'lucide-react'
import { useState, useEffect } from 'react'
import TopBar from '../components/dashboard/TopBar'
import StatsCard from '../components/dashboard/StatsCard'
import AISuggestionCard from '../components/dashboard/AISuggestionCard'
import NoteCard from '../components/dashboard/NoteCard'
import ActivitySidebar from '../components/dashboard/ActivitySidebar'
import MobileNav from '../components/dashboard/MobileNav'

export default function DashboardPage({ onOpenNote }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [backendMessage, setBackendMessage] = useState('Connecting...')
  const [notes, setNotes] = useState([])

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/test`)
      .then(res => res.json())
      .then(data => setBackendMessage(data.message))
      .catch(() => setBackendMessage('Backend Offline ❌'));

    const fetchNotes = () => {
      try {
        const stored = localStorage.getItem('peblo_notes');
        const data = stored ? JSON.parse(stored) : [];
        setNotes(data.sort((a,b) => new Date(b.updatedAt) - new Date(a.updatedAt)));
      } catch (err) {
        console.error('Fetch notes failed:', err)
      }
    }
    fetchNotes()
  }, [])

  return (
    <div className="h-full flex flex-col bg-[#050505] overflow-hidden">
      <TopBar 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        backendStatus={backendMessage}
      />
      
      <div className="flex-1 flex overflow-hidden">
        {/* Main Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="max-w-6xl mx-auto space-y-10">
            {/* Welcome Header */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-3xl font-bold tracking-tight">Welcome back, <span className="text-indigo-400">Peblo User.</span></h2>
                <div className="bg-slate-900 border border-slate-800 px-3 py-1 rounded-full flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${backendMessage.includes('Offline') ? 'bg-red-500' : 'bg-green-500 animate-pulse'}`}></div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{backendMessage}</span>
                </div>
              </div>
              <p className="text-slate-400 text-sm">Your workspace is synced. AI is ready to synthesize your knowledge.</p>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatsCard label="Deep Notes" value={notes.length.toString()} trend="+12%" icon={<FileText className="text-indigo-400" />} />
              <StatsCard label="Neural Connections" value="1,284" trend="+5%" icon={<Target className="text-purple-400" />} />
              <StatsCard label="AI Efficiency" value="94%" trend="+2%" icon={<FlaskConical className="text-emerald-400" />} />
            </div>

            {/* AI Suggestions Row */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-indigo-400">
                <FlaskConical size={18} />
                <h2 className="font-bold text-xs uppercase tracking-[0.2em]">Neural Suggestions</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AISuggestionCard 
                  title="Synthesize Project Alpha" 
                  description="I noticed connections between your last 3 notes. Should I generate a summary?"
                />
                <AISuggestionCard 
                  title="Content Optimization" 
                  description="The 'Brand Identity' note could benefit from more specific visual tokens."
                />
              </div>
            </div>

            {/* Recent Notes Grid */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-400">
                  <Clock size={18} />
                  <h2 className="font-bold text-xs uppercase tracking-[0.2em]">Active Nodes</h2>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-10">
                {notes.map((note) => (
                  <NoteCard 
                    key={note._id} 
                    note={note}
                    onClick={() => onOpenNote(note._id)} 
                  />
                ))}
                {notes.length === 0 && (
                  <div 
                    onClick={() => onOpenNote(null)}
                    className="col-span-full border-2 border-dashed border-slate-800 rounded-3xl p-12 flex flex-col items-center justify-center gap-4 group hover:border-indigo-500/30 transition-all cursor-pointer"
                  >
                    <div className="bg-slate-900 p-4 rounded-2xl text-slate-500 group-hover:text-indigo-400 transition-all">
                      <Plus size={32} />
                    </div>
                    <p className="text-slate-500 font-medium">Create your first neural note</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Activity */}
        <ActivitySidebar />
      </div>

      <MobileNav />
    </div>
  )
}
