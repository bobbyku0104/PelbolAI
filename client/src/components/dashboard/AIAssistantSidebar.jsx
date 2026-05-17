import { Sparkles, Send } from 'lucide-react'
import { useState } from 'react'

export default function AIAssistantSidebar({ currentContext }) {
  const [isTyping, setIsTyping] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Hello! I am Peblo AI. How can I help you with your notes today?' }
  ])
  const [input, setInput] = useState('')

  const handleSendMessage = async (e) => {
    if (e) e.preventDefault()
    if (!input.trim() || isTyping) return

    const userMessage = { role: 'user', text: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    try {
      const token = localStorage.getItem('peblo_token')
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/ai/chat`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ message: input, context: currentContext })
      })

      const data = await response.json()
      if (response.ok) {
        setMessages(prev => [...prev, { role: 'ai', text: data.reply }])
      } else {
        const errorMsg = data.error || data.message || 'Unknown Error'
        setMessages(prev => [...prev, { role: 'ai', text: `⚠️ ${errorMsg}: Please check your GEMINI_API_KEY in the .env file.` }])
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', text: '📡 Connection Failed: Is the backend server running?' }])
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <aside className="w-[340px] border-l border-slate-800 bg-[#050505] p-6 flex flex-col gap-6 h-full shadow-2xl hidden lg:flex">
      <div className="flex items-center justify-between text-indigo-400">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 animate-pulse" />
          <h3 className="font-bold text-xs tracking-[0.2em] uppercase">Neural Assistant</h3>
        </div>
        <button 
          onClick={() => setMessages([{ role: 'ai', text: 'Memory cleared. How can I help?' }])} 
          className="text-[9px] font-bold text-slate-600 hover:text-slate-400 uppercase transition-colors"
        >
          Clear
        </button>
      </div>

      <div className="flex-1 overflow-auto space-y-6 custom-scrollbar pr-2 min-h-0 py-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-[1.25rem] text-[12px] leading-relaxed shadow-xl ${
              msg.role === 'user' 
              ? 'bg-indigo-600 text-white rounded-tr-none shadow-indigo-600/10' 
              : 'bg-slate-900/80 backdrop-blur-md text-slate-300 rounded-tl-none border border-slate-800 shadow-black/20'
            }`}>
              {msg.text.split('\n').map((line, index) => (
                <p key={index} className={index > 0 ? 'mt-2' : ''}>{line}</p>
              ))}
            </div>
            <span className="text-[9px] font-bold text-slate-600 mt-2 uppercase tracking-tighter px-1">
              {msg.role === 'user' ? 'You' : 'Peblo AI'}
            </span>
          </div>
        ))}
        {isTyping && (
          <div className="flex gap-1 ml-2">
            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce"></span>
            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
          </div>
        )}
      </div>

      <div className="space-y-4 pt-4 border-t border-slate-800">
        <div className="flex flex-wrap gap-2">
          {['Summarize', 'Improve', 'Grammar'].map(label => (
            <button 
              key={label} 
              onClick={() => { setInput(label + ' this note.'); }}
              className="text-[10px] font-bold px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-slate-400 hover:text-white hover:border-indigo-500/50 transition-all uppercase tracking-tighter"
            >
              {label}
            </button>
          ))}
        </div>
        
        <form onSubmit={handleSendMessage} className="relative group">
          <textarea 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage(); } }}
            placeholder="Ask AI anything..."
            className="w-full bg-slate-900/50 border border-slate-800 rounded-xl p-4 pr-12 text-sm outline-none focus:border-indigo-500/50 transition-all resize-none h-24 placeholder:text-slate-600"
          />
          <button type="submit" className="absolute right-3 bottom-3 p-2 bg-indigo-600 rounded-lg text-white hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/20">
            <Send size={16} />
          </button>
        </form>
      </div>
    </aside>
  )
}
