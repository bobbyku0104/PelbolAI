import { cloneElement } from 'react'
import { Bot, Plus, Home, Clock, Grid, Settings, LogOut } from 'lucide-react'

export function SidebarLink({ icon, label, active = false }) {
  return (
    <button className={`
      flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all group
      ${active ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-900/50'}
    `}>
      <span className={`${active ? 'text-indigo-400' : 'group-hover:text-slate-300'}`}>
        {cloneElement(icon, { size: 20 })}
      </span>
      <span className="font-medium text-sm">{label}</span>
    </button>
  )
}

export default function Sidebar({ onLogout }) {
  return (
    <aside className="w-64 border-r border-slate-800 flex flex-col bg-[#050505] p-6">
      <div className="flex items-center gap-3 mb-10">
        <div className="bg-indigo-600/20 p-2 rounded-lg border border-indigo-500/30">
          <Bot className="w-6 h-6 text-indigo-400" />
        </div>
        <div>
          <h2 className="font-bold text-lg leading-tight">Peblo AI</h2>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Pro Workspace</p>
        </div>
      </div>

      <button className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-indigo-600 to-purple-600 py-3 rounded-xl font-semibold shadow-lg shadow-indigo-500/20 mb-10 hover:opacity-90 transition-all active:scale-[0.98]">
        <Plus className="w-5 h-5" />
        <span>Create Note</span>
      </button>

      <nav className="flex-1 space-y-2">
        <SidebarLink icon={<Home />} label="Home" active />
        <SidebarLink icon={<Clock />} label="Recent Notes" />
        <SidebarLink icon={<Grid />} label="Categories" />
        <SidebarLink icon={<Settings />} label="Settings" />
      </nav>

      <button 
        onClick={onLogout}
        className="flex items-center gap-3 text-slate-500 hover:text-white transition-colors mt-auto pt-6 border-t border-slate-800"
      >
        <LogOut className="w-5 h-5" />
        <span className="font-medium">Logout</span>
      </button>
    </aside>
  )
}
