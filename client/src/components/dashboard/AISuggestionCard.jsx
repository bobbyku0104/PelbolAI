import { Sparkles } from 'lucide-react'

export default function AISuggestionCard() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#1a1a2e] to-black border border-slate-800 rounded-3xl p-8 flex flex-col md:flex-row gap-8 items-center">
      {/* Decorative Glow */}
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-indigo-600/20 rounded-full blur-[100px]"></div>
      
      {/* Image Side */}
      <div className="relative w-full md:w-1/3 aspect-square max-w-[240px]">
        <div className="absolute inset-0 bg-indigo-500/10 rounded-2xl blur-xl animate-pulse"></div>
        <img 
          src="/ai-suggestion.png" 
          alt="AI Visualization" 
          className="relative w-full h-full object-cover rounded-2xl border border-slate-700/50 shadow-2xl"
        />
      </div>

      {/* Content Side */}
      <div className="flex-1 text-center md:text-left z-10">
        <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full mb-6">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-[0.2em]">AI Suggestion</span>
        </div>
        
        <h2 className="text-3xl font-bold mb-4 tracking-tight">Optimize your Q4 workflow</h2>
        <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-xl">
          Based on your last 10 notes, AI suggests creating a centralized 'Brand Assets' category 
          to reduce search time by 24%. Would you like Peblo to organize this for you?
        </p>

        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
          <button className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-3 rounded-xl font-bold shadow-lg shadow-indigo-500/20 hover:opacity-90 transition-all active:scale-[0.98]">
            Execute Action
          </button>
          <button className="bg-slate-900/50 border border-slate-800 px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all active:scale-[0.98]">
            Dismiss
          </button>
        </div>
      </div>
    </div>
  )
}
