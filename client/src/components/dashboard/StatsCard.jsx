export default function StatsCard({ icon, label, value, subtext }) {
  return (
    <div className="bg-[#111111]/50 border border-slate-800 p-6 rounded-2xl hover:border-slate-700 transition-all group">
      <div className="bg-slate-800/50 w-10 h-10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-500/10 group-hover:text-indigo-400 transition-all text-slate-400">
        {icon}
      </div>
      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{label}</p>
      <div className="flex items-baseline gap-2">
        <h3 className="text-3xl font-bold">{value}</h3>
        {subtext && <span className="text-xs text-slate-500 font-medium">{subtext}</span>}
      </div>
    </div>
  )
}
