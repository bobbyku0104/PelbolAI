import { Share2, Plus, ArrowLeft, Grid } from 'lucide-react'

export default function GraphPage({ onBack }) {
  return (
    <div className="h-full flex flex-col bg-[#050505] overflow-hidden">
      {/* Header */}
      <header className="h-20 border-b border-slate-800 flex items-center justify-between px-10">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-slate-900 rounded-lg text-slate-500 transition-colors">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold tracking-tight text-white">Neural Categories</h1>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg text-sm font-bold transition-all">
          <Share2 size={16} /> Export Graph
        </button>
      </header>

      {/* Graph Visualizer Area */}
      <div className="flex-1 relative bg-[radial-gradient(circle_at_center,_#111_0%,_#000_100%)] flex items-center justify-center overflow-hidden">
        {/* Abstract Background Grid */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        <div className="relative text-center">
          <div className="absolute -inset-20 bg-indigo-500/10 rounded-full blur-[80px] animate-pulse"></div>
          <Grid size={80} className="text-indigo-500/20 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-white mb-2">Knowledge Graph Coming Soon</h2>
          <p className="text-slate-500 text-sm max-w-md mx-auto">
            Our neural engine is still mapping your connections. Your visual workspace will be available once you reach 50 synchronized nodes.
          </p>
          
          <div className="mt-10 flex gap-4 justify-center">
            <div className="w-3 h-3 bg-indigo-500 rounded-full animate-ping"></div>
            <div className="w-3 h-3 bg-purple-500 rounded-full animate-ping delay-150"></div>
            <div className="w-3 h-3 bg-indigo-500 rounded-full animate-ping delay-300"></div>
          </div>
        </div>

        {/* Floating Action */}
        <button className="absolute bottom-10 right-10 p-4 bg-slate-900 border border-slate-800 rounded-2xl text-slate-400 hover:text-white hover:border-indigo-500/50 transition-all shadow-2xl">
          <Plus size={24} />
        </button>
      </div>
    </div>
  )
}
