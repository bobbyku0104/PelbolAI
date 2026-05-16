import { Search, Bell, Bot } from 'lucide-react'

export default function TopBar({ hideSearch = false }) {
  return (
    <header className={`h-20 flex items-center justify-between px-8 bg-transparent ${hideSearch ? 'w-fit border-none px-0' : 'border-b border-slate-800 bg-[#050505]/50 backdrop-blur-sm'}`}>
      {!hideSearch && (
        <div className="relative w-full max-w-md group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
          <input 
            type="text" 
            placeholder="Search workspace, notes, or AI commands..."
            className="w-full bg-slate-900/50 border border-slate-800 rounded-full py-2.5 pl-11 pr-4 outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all text-sm placeholder:text-slate-600"
          />
        </div>
      )}

      <div className="flex items-center gap-6">
        <button className="relative text-slate-400 hover:text-white transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-indigo-500 rounded-full border-2 border-black"></span>
        </button>
        <button className="text-slate-400 hover:text-white transition-colors">
          <Bot className="w-5 h-5" />
        </button>
        
        <div className="h-8 w-[1px] bg-slate-800 mx-2"></div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-semibold">Alex Rivera</p>
            <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Enterprise</p>
          </div>
          <img 
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" 
            alt="Profile" 
            className="w-10 h-10 rounded-full border border-slate-700 p-0.5"
          />
        </div>
      </div>
    </header>
  )
}
