export default function NoteCard({ icon, title, description, time, avatars }) {
  return (
    <div className="bg-[#111111]/50 border border-slate-800 p-6 rounded-2xl hover:border-slate-700 transition-all group cursor-pointer flex flex-col h-full">
      <div className="bg-slate-800/50 w-10 h-10 rounded-lg flex items-center justify-center mb-6 text-slate-400 group-hover:bg-indigo-500/10 group-hover:text-indigo-400 transition-all">
        {icon}
      </div>
      <h3 className="font-bold text-lg mb-2 group-hover:text-indigo-300 transition-colors">{title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-2 flex-1">
        {description}
      </p>
      
      <div className="flex items-center justify-between pt-4 border-t border-slate-800/50">
        <span className="text-xs text-slate-500 font-medium">Edited {time} ago</span>
        <div className="flex -space-x-2">
          {avatars && avatars.map((url, i) => (
            <img 
              key={i} 
              src={url} 
              alt="Avatar" 
              className="w-6 h-6 rounded-full border-2 border-black object-cover"
            />
          ))}
        </div>
      </div>
    </div>
  )
}
