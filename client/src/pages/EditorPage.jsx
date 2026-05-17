import { useState, useEffect } from 'react'
import { Check, ArrowLeft, Save, Trash2 } from 'lucide-react'
import EditorToolbar from '../components/dashboard/EditorToolbar'
import AIAssistantSidebar from '../components/dashboard/AIAssistantSidebar'

export default function EditorPage({ onBack, noteId }) {
  const [title, setTitle] = useState('Untitled Note')
  const [content, setContent] = useState('')
  const [saveStatus, setSaveStatus] = useState('idle') // idle, saving, success

  useEffect(() => {
    if (noteId) {
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
        setTitle('Untitled Note')
        setContent('')
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
      const res = await fetch(`http://localhost:5000/api/notes/${noteId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (res.ok) onBack()
    } catch (err) {
      console.error('Delete failed:', err)
    }
  }

  return (
    <div className="h-full flex bg-black text-slate-200 overflow-hidden">
      <main className="flex-1 flex flex-col bg-[#050505] overflow-hidden">
        {/* Editor Header */}
        <header className="h-20 border-b border-slate-800 flex items-center justify-between px-8">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-2 hover:bg-slate-900 rounded-lg text-slate-500 transition-colors">
              <ArrowLeft size={20} />
            </button>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-transparent text-xl font-bold outline-none border-b border-transparent focus:border-indigo-500/50 transition-all px-2 py-1"
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest mr-4">
              {saveStatus === 'saving' ? (
                <span className="flex gap-1"><span className="w-1 h-1 bg-indigo-500 rounded-full animate-bounce"></span><span className="w-1 h-1 bg-indigo-500 rounded-full animate-bounce delay-75"></span></span>
              ) : saveStatus === 'success' ? (
                <span className="text-emerald-400 flex items-center gap-1"><Check size={14} /> Saved</span>
              ) : (
                'All changes synced'
              )}
            </div>
            <button 
              onClick={handleSave}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg text-sm font-bold transition-all"
            >
              <Save size={16} /> Save
            </button>
            <button 
              onClick={handleDelete}
              className="p-2 text-slate-600 hover:text-red-400 transition-colors"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </header>

        {/* Toolbar */}
        <EditorToolbar />

        {/* Editor Area */}
        <div className="flex-1 overflow-y-auto p-12 custom-scrollbar">
          <textarea 
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Start synthesizing your thoughts..."
            className="w-full h-full bg-transparent resize-none outline-none text-lg leading-relaxed text-slate-300 placeholder:text-slate-800"
          />
        </div>
      </main>

      <AIAssistantSidebar currentContext={content} />
    </div>
  )
}
