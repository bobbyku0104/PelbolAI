import { useState, useEffect } from 'react'
import { Check } from 'lucide-react'
import Sidebar from '../components/dashboard/Sidebar'
import EditorToolbar from '../components/dashboard/EditorToolbar'
import AIAssistantSidebar from '../components/dashboard/AIAssistantSidebar'

export default function EditorPage({ onLogout, onBack, noteId }) {
  const [title, setTitle] = useState('Untitled Note')
  const [content, setContent] = useState('')
  const [saveStatus, setSaveStatus] = useState('idle') // idle, saving, success

  useEffect(() => {
    if (noteId) {
      // Fetch existing note if editing
      const fetchNote = async () => {
        const token = localStorage.getItem('peblo_token')
        const res = await fetch(`http://localhost:5000/api/notes/${noteId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
        const data = await res.json()
        if (res.ok) {
          setTitle(data.title)
          setContent(data.content)
        }
      }
      fetchNote()
    }
  }, [noteId])

  const handleSave = async () => {
    setSaveStatus('saving')
    const token = localStorage.getItem('peblo_token')
    const method = noteId ? 'PUT' : 'POST'
    const endpoint = noteId ? `http://localhost:5000/api/notes/${noteId}` : 'http://localhost:5000/api/notes'

    try {
      const response = await fetch(endpoint, {
        method,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title, content })
      })

      if (response.ok) {
        setSaveStatus('success')
        setTimeout(() => setSaveStatus('idle'), 2000)
      }
    } catch (err) {
      console.error('Save failed:', err)
      setSaveStatus('idle')
    }
  }

  const handleDelete = async () => {
    if (!noteId) return onBack()
    if (!window.confirm('Are you sure you want to delete this note?')) return

    const token = localStorage.getItem('peblo_token')
    try {
      const response = await fetch(`http://localhost:5000/api/notes/${noteId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (response.ok) onBack()
    } catch (err) {
      console.error('Delete failed:', err)
    }
  }
  return (
    <div className="flex h-screen bg-black text-white">
      <Sidebar onLogout={onLogout} activePage="Recent Notes" />

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Floating Toolbar */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 z-20">
          <EditorToolbar />
        </div>

        {/* Scrollable Editor Area */}
        <div className="flex-1 overflow-auto p-20 pt-32 custom-scrollbar">
          <div className="max-w-3xl mx-auto space-y-12">
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-transparent text-5xl font-bold outline-none placeholder:text-slate-800 text-white"
              placeholder="Note Title"
            />
            
            <textarea 
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full h-[500px] bg-transparent text-slate-300 text-lg leading-relaxed outline-none resize-none placeholder:text-slate-800"
              placeholder="Start writing your thoughts..."
            ></textarea>

            <div className="pt-20 flex gap-4">
              <button 
                onClick={handleDelete}
                className="px-8 py-3 bg-slate-900 border border-slate-800 rounded-xl font-bold hover:bg-slate-800 transition-all active:scale-[0.98]"
              >
                {noteId ? 'Delete Note' : 'Cancel'}
              </button>
              <button 
                onClick={handleSave}
                className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-indigo-400 text-black font-bold rounded-xl hover:opacity-90 transition-all active:scale-[0.98] flex items-center gap-2 min-w-[140px] justify-center"
              >
                {saveStatus === 'saving' ? (
                  <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></span>
                ) : saveStatus === 'success' ? (
                  <><Check size={18} /> Saved</>
                ) : (
                  'Save Note'
                )}
              </button>
            </div>
          </div>
        </div>
      </main>

      <AIAssistantSidebar />
    </div>
  )
}
