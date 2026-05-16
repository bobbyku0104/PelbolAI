import { FileText, Share2, Target, Layout, FlaskConical, Plus, Grid } from 'lucide-react'
import Sidebar from '../components/dashboard/Sidebar'
import TopBar from '../components/dashboard/TopBar'
import StatsCard from '../components/dashboard/StatsCard'
import AISuggestionCard from '../components/dashboard/AISuggestionCard'
import NoteCard from '../components/dashboard/NoteCard'
import ActivitySidebar from '../components/dashboard/ActivitySidebar'

export default function DashboardPage({ onLogout, onOpenNote, onOpenGraph }) {
  return (
    <div className="flex h-screen bg-black text-white">
      <Sidebar onLogout={onLogout} onOpenGraph={onOpenGraph} onOpenHome={() => {}} activePage="Home" />

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopBar />

        {/* Scrollable Content */}
        <div className="flex-1 overflow-auto p-10 space-y-12 custom-scrollbar">
          {/* Welcome Header */}
          <div>
            <h2 className="text-3xl font-bold mb-2 tracking-tight">Welcome back, <span className="text-indigo-400">Alex.</span></h2>
            <p className="text-slate-400 text-sm">Your workspace is synced. AI has identified 3 new insights from your shared assets today.</p>
          </div>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatsCard icon={<FileText size={20} />} label="Total Notes" value="1,284" />
            <StatsCard icon={<Share2 size={20} />} label="Shared Assets" value="42" />
            <StatsCard icon={<Target size={20} />} label="AI Tokens" value="84%" />
          </div>

          {/* AI Suggestion Card */}
          <AISuggestionCard />

          {/* Main Content Grid (Notes + Activity) */}
          <div className="flex flex-col xl:flex-row gap-10">
            {/* Recent Notes Section */}
            <div className="flex-1 space-y-8">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">Recent Notes</h3>
                <div className="flex gap-2">
                  <button className="p-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors">
                    <Grid size={18} />
                  </button>
                  <button className="p-2 bg-slate-800 border border-slate-700 rounded-lg text-white">
                    <Layout size={18} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" onClick={onOpenNote}>
                <NoteCard 
                  icon={<FileText size={20} />}
                  title="Product Roadmap..."
                  description="Detailed breakdown of upcoming features for Q3 and Q4 including AI integrations..."
                  time="4h"
                  avatars={["https://i.pravatar.cc/150?u=1", "https://i.pravatar.cc/150?u=2"]}
                />
                <NoteCard 
                  icon={<Layout size={20} />}
                  title="Brand Identity..."
                  description="Defining the visual tokens for the new dark luxury aesthetic including palettes..."
                  time="12h"
                  avatars={["https://i.pravatar.cc/150?u=3"]}
                />
                <NoteCard 
                  icon={<FlaskConical size={20} />}
                  title="User Research..."
                  description="Aggregated feedback from the beta testing group regarding the new graph view..."
                  time="Yesterday"
                  avatars={["https://i.pravatar.cc/150?u=4", "https://i.pravatar.cc/150?u=5"]}
                />
                
                {/* New Note Placeholder Card */}
                <div className="bg-[#050505] border-2 border-dashed border-slate-800 p-6 rounded-2xl flex flex-col items-center justify-center gap-4 hover:border-indigo-500/50 transition-all cursor-pointer group min-h-[220px]">
                   <div className="relative">
                      <Plus className="w-8 h-8 text-slate-600 group-hover:text-indigo-400 transition-colors" />
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-indigo-500 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-all"></div>
                   </div>
                   <span className="text-sm font-bold text-slate-500 group-hover:text-slate-300">New Note</span>
                </div>
              </div>
            </div>

            {/* Activity Sidebar Section */}
            <div className="w-full xl:w-[360px]">
              <ActivitySidebar />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
