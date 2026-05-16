import { Bold, Italic, List, Link, Image, Code } from 'lucide-react'

export default function EditorToolbar() {
  return (
    <div className="bg-[#111111]/80 backdrop-blur-md border border-slate-800 px-6 py-2 rounded-2xl flex items-center gap-6 shadow-2xl">
      <button className="text-slate-400 hover:text-white transition-colors"><Bold size={18} /></button>
      <button className="text-slate-400 hover:text-white transition-colors"><Italic size={18} /></button>
      <button className="text-slate-400 hover:text-white transition-colors"><List size={18} /></button>
      <div className="w-[1px] h-4 bg-slate-800"></div>
      <button className="text-slate-400 hover:text-white transition-colors"><Link size={18} /></button>
      <button className="text-slate-400 hover:text-white transition-colors"><Image size={18} /></button>
      <button className="text-slate-400 hover:text-white transition-colors"><Code size={18} /></button>
    </div>
  )
}
