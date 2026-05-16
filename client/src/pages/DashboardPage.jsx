import { FileText, Share2, Target } from 'lucide-react'
import Sidebar from '../components/dashboard/Sidebar'
import TopBar from '../components/dashboard/TopBar'
import StatsCard from '../components/dashboard/StatsCard'
import AISuggestionCard from '../components/dashboard/AISuggestionCard'

export default function DashboardPage({ onLogout }) {
  return (
    <div className="flex h-screen bg-black text-white">
      <Sidebar onLogout={onLogout} />

      <main className="flex-1 flex flex-col min-w-0">
        <TopBar />

        {/* Content Section */}
        <div className="flex-1 overflow-auto p-10 space-y-10 custom-scrollbar">
          {/* Welcome Header */}
          <div>
            <h2 className="text-3xl font-bold mb-2 tracking-tight">Welcome back, <span className="text-indigo-400">Alex.</span></h2>
            <p className="text-slate-400 text-sm">Your workspace is synced. AI has identified 3 new insights from your shared assets today.</p>
          </div>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatsCard 
              icon={<FileText size={20} />} 
              label="Total Notes" 
              value="1,284" 
            />
            <StatsCard 
              icon={<Share2 size={20} />} 
              label="Shared Assets" 
              value="42" 
            />
            <StatsCard 
              icon={<Target size={20} />} 
              label="AI Tokens" 
              value="84%" 
            />
          </div>

          {/* AI Suggestion Card */}
          <AISuggestionCard />

          {/* Placeholder for Recent Notes */}
          <div className="flex items-center justify-center h-[300px] border-2 border-dashed border-slate-800 rounded-3xl">
            <p className="text-slate-500 italic text-lg">Recent Notes & Activity coming in Step 3...</p>
          </div>
        </div>
      </main>
    </div>
  )
}
