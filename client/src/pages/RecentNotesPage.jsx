import { FileText, MoreVertical, Search, Filter, ArrowUpDown, Clock } from 'lucide-react'
import Sidebar from '../components/dashboard/Sidebar'
import TopBar from '../components/dashboard/TopBar'
import { motion } from 'framer-motion'

const NOTES = [
  { id: 1, title: "Product Roadmap Q3", category: "Product", time: "4h ago", size: "12kb" },
  { id: 2, title: "Brand Identity 2024", category: "Design", time: "12h ago", size: "45kb" },
  { id: 3, title: "User Research Insights", category: "Research", time: "Yesterday", size: "8kb" },
  { id: 4, title: "Q4 Marketing Strategy", category: "Marketing", time: "2 days ago", size: "112kb" },
  { id: 5, title: "Neural Synthesis Notes", category: "AI", time: "3 days ago", size: "5kb" },
  { id: 6, title: "Investor Deck v2", category: "Finance", time: "1 week ago", size: "2.4mb" },
]

export default function RecentNotesPage({ onLogout, onBack, onOpenNote, onOpenCreate }) {
  return (
    <div className="flex h-screen bg-black text-white">
      <Sidebar 
        onLogout={onLogout} 
        onOpenHome={onBack} 
        onOpenCreate={onOpenCreate}
        onOpenRecent={() => {}}
        onOpenGraph={() => {}}
        onOpenSettings={() => {}}
        activePage="Recent Notes" 
      />

      <main className="flex-1 flex flex-col min-w-0">
        <TopBar hideSearch />

        <div className="flex-1 overflow-auto p-10 space-y-8 custom-scrollbar">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">Recent Notes</h2>
              <p className="text-slate-400 text-sm">Review and manage your latest workspace contributions.</p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative group flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                <input 
                  type="text" 
                  placeholder="Filter notes..." 
                  className="w-full bg-slate-900/50 border border-slate-800 rounded-xl py-2 pl-10 pr-4 text-sm outline-none focus:border-indigo-500/50 transition-all"
                />
              </div>
              <button className="p-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-400 hover:text-white transition-all">
                <Filter size={20} />
              </button>
            </div>
          </div>

          <div className="bg-[#0a0a0a] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
            <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-slate-800 bg-slate-900/20 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              <div className="col-span-6 flex items-center gap-2">Name <ArrowUpDown size={12} /></div>
              <div className="col-span-2">Category</div>
              <div className="col-span-2">Last Edited</div>
              <div className="col-span-2 text-right">Size</div>
            </div>

            <div className="divide-y divide-slate-800/50">
              {NOTES.map((note, index) => (
                <motion.div 
                  key={note.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={onOpenNote}
                  className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-slate-900/30 transition-all group cursor-pointer"
                >
                  <div className="col-span-6 flex items-center gap-4">
                    <div className="bg-slate-800/50 p-2 rounded-lg text-slate-400 group-hover:bg-indigo-500/10 group-hover:text-indigo-400 transition-all">
                      <FileText size={18} />
                    </div>
                    <span className="font-semibold text-sm group-hover:text-indigo-300 transition-colors">{note.title}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-[10px] font-bold bg-slate-900 border border-slate-800 text-slate-400 px-2 py-0.5 rounded uppercase tracking-tight">
                      {note.category}
                    </span>
                  </div>
                  <div className="col-span-2 text-sm text-slate-500 flex items-center gap-2">
                    <Clock size={14} />
                    {note.time}
                  </div>
                  <div className="col-span-2 text-right text-xs text-slate-600 font-medium font-mono">
                    {note.size}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
