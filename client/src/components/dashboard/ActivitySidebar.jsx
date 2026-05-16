export function ActivityItem({ color, title, time, isLast = false }) {
  return (
    <div className="flex gap-4 group">
      <div className="flex flex-col items-center">
        <div className={`w-3 h-3 rounded-full mt-1.5 ring-4 ring-black ${color}`}></div>
        {!isLast && <div className="w-[1px] flex-1 bg-slate-800 my-1"></div>}
      </div>
      <div className="pb-8">
        <p className="text-sm text-slate-300 font-medium group-hover:text-white transition-colors">{title}</p>
        <p className="text-xs text-slate-500 mt-1">{time}</p>
      </div>
    </div>
  )
}

export default function ActivitySidebar() {
  return (
    <div className="bg-[#0d0d0d] border border-slate-800 rounded-3xl p-8 h-fit">
      <div className="flex items-center justify-between mb-8">
        <h3 className="font-bold text-lg">Recent Activity</h3>
        <button className="text-xs text-indigo-400 font-bold hover:text-indigo-300 transition-colors uppercase tracking-wider">View all</button>
      </div>

      <div className="flex flex-col">
        <ActivityItem 
          color="bg-blue-400" 
          title={<>Sarah edited <span className="text-indigo-400 underline decoration-indigo-400/30">Q4 Strategy.md</span></>} 
          time="2 mins ago" 
        />
        <ActivityItem 
          color="bg-purple-400" 
          title="AI generated a summary for Client Meeting" 
          time="1 hour ago" 
        />
        <ActivityItem 
          color="bg-sky-400" 
          title="New member joined Product Team" 
          time="3 hours ago" 
        />
        <ActivityItem 
          color="bg-slate-500" 
          title="You archived Old Research Notes" 
          time="Yesterday" 
          isLast 
        />
      </div>
    </div>
  )
}
