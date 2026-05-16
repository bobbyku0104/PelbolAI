import { Search, Bell, Bot, Share2, Sparkles, Maximize2, ZoomIn, ZoomOut, AlertCircle } from 'lucide-react'
import Sidebar from '../components/dashboard/Sidebar'
import CategorySidebar from '../components/dashboard/CategorySidebar'

export default function GraphPage({ onLogout, onBack }) {
  return (
    <div className="flex h-screen bg-black text-white overflow-hidden">
      <Sidebar onLogout={onLogout} onOpenHome={onBack} activePage="Categories" />

      <main className="flex-1 flex flex-col min-w-0 relative">
        {/* Top Navigation Bar */}
        <header className="h-16 border-b border-slate-800 flex items-center justify-between px-8 bg-black/50 backdrop-blur-md z-20">
          <div className="flex items-center gap-8">
            <nav className="flex items-center gap-6">
              <NavLink label="Editor" />
              <NavLink label="Collaboration" />
              <NavLink label="Insights" active />
            </nav>
          </div>

          <div className="flex items-center gap-4">
             <button className="flex items-center gap-2 bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 px-4 py-1.5 rounded-full text-xs font-bold hover:bg-indigo-600/30 transition-all">
               <Sparkles size={14} />
               Ask AI
             </button>
             <div className="h-6 w-[1px] bg-slate-800"></div>
             <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" className="w-8 h-8 rounded-full border border-slate-700" alt="Profile" />
          </div>
        </header>

        {/* Graph Area */}
        <div className="flex-1 relative bg-[radial-gradient(circle_at_center,_#0a0a1a_0%,_#000000_100%)]">
           <CategorySidebar />

           {/* Simulated Graph Background */}
           <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
              <svg width="100%" height="100%" className="text-slate-700">
                <line x1="40%" y1="30%" x2="60%" y2="50%" stroke="currentColor" strokeWidth="1" />
                <line x1="60%" y1="50%" x2="50%" y2="80%" stroke="currentColor" strokeWidth="1" />
                <line x1="50%" y1="80%" x2="40%" y2="30%" stroke="currentColor" strokeWidth="1" />
                <circle cx="40%" cy="30%" r="4" fill="currentColor" />
                <circle cx="60%" cy="50%" r="4" fill="currentColor" />
                <circle cx="50%" cy="80%" r="4" fill="currentColor" />
                <circle cx="80%" cy="40%" r="4" fill="currentColor" />
                <line x1="60%" y1="50%" x2="80%" y2="40%" stroke="currentColor" strokeWidth="1" />
              </svg>
           </div>

           {/* Active Node Card */}
           <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] z-10 animate-in zoom-in-95 duration-500">
              <div className="bg-[#1a1a2e]/80 backdrop-blur-xl border border-indigo-500/30 p-8 rounded-3xl shadow-[0_0_50px_rgba(79,70,229,0.2)] relative">
                <button className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors">
                  <Maximize2 size={16} />
                </button>
                <div className="bg-indigo-500/20 text-indigo-400 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full w-fit mb-4">Active Node</div>
                <h2 className="text-2xl font-bold mb-4">Neural Architecture</h2>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Exploring the convergence of biological neuroplasticity and synthetic transformer models. Current research links to 24 sub-concepts.
                </p>
                <div className="flex gap-2">
                  <span className="text-[10px] font-bold text-slate-500 border border-slate-800 px-2 py-1 rounded">#machine-learning</span>
                  <span className="text-[10px] font-bold text-slate-500 border border-slate-800 px-2 py-1 rounded">#ai-ethics</span>
                </div>
              </div>
           </div>

           {/* Graph Controls */}
           <div className="absolute right-8 bottom-32 flex flex-col gap-2">
              <ControlButton icon={<Maximize2 size={18} />} />
              <ControlButton icon={<ZoomIn size={18} />} />
              <ControlButton icon={<ZoomOut size={18} />} />
           </div>

           {/* Insights Bottom Bar */}
           <div className="absolute bottom-8 left-8 right-8 grid grid-cols-2 gap-6">
              <InsightCard 
                icon={<Bot size={20} className="text-indigo-400" />}
                title="Insight Extract"
                tag="AI GENERATED"
                description="Neural patterns suggest a correlation between 'Latent Spaces' and 'Quantum Superposition' within your current research cluster."
              />
              <InsightCard 
                icon={<AlertCircle size={20} className="text-orange-400" />}
                title="Cross-Link Alerts"
                tag="3 POTENTIAL"
                description="3 potential duplicate concepts found in 'Templates' and 'Shared' workspaces. Suggesting auto-merge."
              />
           </div>
        </div>
      </main>
    </div>
  )
}

function NavLink({ label, active = false }) {
  return (
    <button className={`text-sm font-bold transition-colors ${active ? 'text-white border-b-2 border-indigo-500 pb-5 pt-5' : 'text-slate-500 hover:text-slate-300'}`}>
      {label}
    </button>
  )
}

function ControlButton({ icon }) {
  return (
    <button className="bg-slate-900/50 border border-slate-800 p-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all">
      {icon}
    </button>
  )
}

function InsightCard({ icon, title, tag, description }) {
  return (
    <div className="bg-[#0a0a0a]/80 backdrop-blur-md border border-slate-800 p-6 rounded-2xl flex items-center gap-6 group hover:border-slate-700 transition-all cursor-pointer">
      <div className="bg-slate-800/50 p-4 rounded-xl text-slate-400 group-hover:bg-slate-800 transition-all">
        {icon}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-1">
          <h4 className="font-bold text-sm">{title}</h4>
          <span className="text-[9px] font-bold bg-slate-800 text-slate-500 px-2 py-0.5 rounded uppercase tracking-widest">{tag}</span>
        </div>
        <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{description}</p>
      </div>
      <Share2 size={16} className="text-slate-600 group-hover:text-slate-400" />
    </div>
  )
}
