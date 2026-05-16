import Sidebar from '../components/dashboard/Sidebar'
import TopBar from '../components/dashboard/TopBar'

export default function DashboardPage({ onLogout }) {
  return (
    <div className="flex h-screen bg-black text-white">
      <Sidebar onLogout={onLogout} />

      <main className="flex-1 flex flex-col min-w-0">
        <TopBar />

        {/* Content Section */}
        <div className="flex-1 overflow-auto p-10 bg-black">
          <h2 className="text-3xl font-bold mb-2">Welcome back, <span className="text-indigo-400">Alex.</span></h2>
          <p className="text-slate-400 text-sm mb-10">Your workspace is synced. AI has identified 3 new insights from your shared assets today.</p>
          
          <div className="flex items-center justify-center h-[400px] border-2 border-dashed border-slate-800 rounded-3xl">
            <p className="text-slate-500 italic text-lg">Main dashboard content coming in Step 2...</p>
          </div>
        </div>
      </main>
    </div>
  )
}
