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
      const fetchNote = () => {
        const stored = localStorage.getItem('peblo_notes');
        const data = stored ? JSON.parse(stored) : [];
        const note = data.find(n => n._id === noteId);
        if (note) {
          setTitle(note.title)
          setContent(note.content)
        }
      }
      fetchNote()
    }
  }, [noteId])

  const handleSave = () => {
    setSaveStatus('saving')
    try {
      const stored = localStorage.getItem('peblo_notes');
      let data = stored ? JSON.parse(stored) : [];
      
      if (noteId) {
        data = data.map(n => n._id === noteId ? { ...n, title, content, updatedAt: new Date() } : n);
      } else {
        const newNote = {
          _id: 'note_' + Date.now(),
          title,
          content,
          updatedAt: new Date(),
          category: 'General'
        };
        data.push(newNote);
      }
      
      localStorage.setItem('peblo_notes', JSON.stringify(data));
      setSaveStatus('success')
      setTitle('Untitled Note')
      setContent('')
      setTimeout(() => setSaveStatus('idle'), 2000)
    } catch (err) {
      console.error('Save failed:', err)
      setSaveStatus('idle')
    }
  }

  const handleDelete = () => {
    if (!noteId) return onBack()
    if (!window.confirm('Are you sure you want to delete this note?')) return
    
    try {
      const stored = localStorage.getItem('peblo_notes');
      let data = stored ? JSON.parse(stored) : [];
      data = data.filter(n => n._id !== noteId);
      localStorage.setItem('peblo_notes', JSON.stringify(data));
      onBack()
    } catch (err) {
      console.error('Delete failed:', err)
    }
  }

  return (
    <div className="h-full flex bg-black text-slate-200 overflow-hidden">
      <main className="flex-1 flex flex-col bg-[#050505] overflow-hidden">
        {/* Editor Header */}
        <header className="h-16 md:h-20 border-b border-slate-800 flex items-center justify-between px-4 md:px-8 shrink-0">
          <div className="flex items-center gap-2 md:gap-4 flex-1 min-w-0">
            <button onClick={onBack} className="p-2 hover:bg-slate-900 rounded-lg text-slate-500 transition-colors shrink-0">
              <ArrowLeft size={20} />
            </button>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-transparent text-lg md:text-xl font-bold outline-none border-b border-transparent focus:border-indigo-500/50 transition-all px-2 py-1 w-full truncate"
            />
          </div>

          <div className="flex items-center gap-2 md:gap-4 shrink-0">
            <div className="hidden md:flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest mr-4">
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
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 px-3 md:px-4 py-2 rounded-lg text-sm font-bold transition-all"
            >
              <Save size={16} /> <span className="hidden md:inline">Save</span>
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
