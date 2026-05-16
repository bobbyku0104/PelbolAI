export default function CategorySidebar() {
  return (
    <aside className="w-64 p-8 border-r border-slate-800 flex flex-col gap-10">
      <div className="space-y-6">
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Auto-Categorization</p>
        
        <div className="space-y-6">
          <CategoryItem label="Machine Learning" value={84} color="bg-indigo-500" />
          <CategoryItem label="Quantum Theory" value={62} color="bg-sky-500" />
          <CategoryItem label="Digital Philosophy" value={41} color="bg-purple-500" />
        </div>
      </div>

      <div className="mt-auto pt-10 border-t border-slate-800 space-y-4">
        <div className="bg-indigo-500/5 border border-indigo-500/10 p-4 rounded-xl">
           <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-2">Sync Status</p>
           <p className="text-xs text-slate-400 leading-relaxed">
             Global index updated 2m ago. 14 new cross-links established since last session.
           </p>
        </div>
      </div>
    </aside>
  )
}

function CategoryItem({ label, value, color }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-[11px] font-bold uppercase tracking-tight">
        <span className="text-slate-300">{label}</span>
        <span className="text-slate-500">{value}% Density</span>
      </div>
      <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full transition-all duration-1000`} style={{ width: `${value}%` }}></div>
      </div>
    </div>
  )
}
