import { Sparkles, Send } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function AIAssistantSidebar() {
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsTyping(true), 2000)
    const stopTimer = setTimeout(() => setIsTyping(false), 5000)
    return () => { clearTimeout(timer); clearTimeout(stopTimer); }
  }, [])

  return (
    <aside className="w-[340px] border-l border-slate-800 bg-[#050505] p-8 flex flex-col gap-8">
      <div className="flex items-center gap-2 text-indigo-400">
        <Sparkles className="w-5 h-5" />
        <h3 className="font-bold text-sm tracking-widest uppercase">AI Assistant</h3>
        {isTyping && <span className="flex gap-1 ml-2"><span className="w-1 h-1 bg-indigo-400 rounded-full animate-bounce"></span><span className="w-1 h-1 bg-indigo-400 rounded-full animate-bounce delay-75"></span><span className="w-1 h-1 bg-indigo-400 rounded-full animate-bounce delay-150"></span></span>}
      </div>

      <div className="space-y-4">
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Suggested Actions</p>
        <div className="space-y-2">
          <ActionButton label="Summarize Note" />
          <ActionButton label="Improve Writing" />
          <ActionButton label="Generate Title" />
        </div>
      </div>

      <div className="bg-indigo-500/5 border border-indigo-500/10 p-4 rounded-xl italic text-xs text-slate-400 leading-relaxed relative">
        <div className="absolute -left-1 top-4 w-2 h-2 bg-[#050505] border-l border-t border-indigo-500/10 rotate-45"></div>
        "This note explores deep synthesis and digital productivity. Would you like me to extract key takeaways or suggest citations?"
      </div>

      <div className="mt-auto space-y-4">
        <div className="relative group">
          <textarea 
            placeholder="Ask AI anything..."
            className="w-full bg-slate-900/50 border border-slate-800 rounded-xl p-4 pr-12 text-sm outline-none focus:border-indigo-500/50 transition-all resize-none h-24 placeholder:text-slate-600"
          />
          <button className="absolute right-3 bottom-3 p-2 bg-indigo-600 rounded-lg text-white hover:bg-indigo-500 transition-all">
            <Send size={16} />
          </button>
        </div>

        <div className="relative group overflow-hidden rounded-xl border border-slate-800 aspect-video">
           <img 
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=250&fit=crop" 
            alt="AI Context" 
            className="w-full h-full object-cover grayscale opacity-30 group-hover:opacity-50 transition-all duration-700"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent"></div>
           <p className="absolute bottom-3 left-3 text-[10px] font-bold text-slate-600 uppercase tracking-widest">Neural Context VIS_01</p>
        </div>
      </div>
    </aside>
  )
}

function ActionButton({ label }) {
  return (
    <button className="w-full text-left px-4 py-3 bg-slate-900/50 border border-slate-800 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-all">
      {label}
    </button>
  )
}
