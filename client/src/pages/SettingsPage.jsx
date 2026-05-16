import { User, Bell, Shield, Moon, Zap, ArrowLeft } from 'lucide-react'

export default function SettingsPage({ onBack }) {
  return (
    <div className="h-full flex flex-col bg-[#050505] overflow-hidden">
      {/* Header */}
      <header className="h-20 border-b border-slate-800 flex items-center justify-between px-10">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-slate-900 rounded-lg text-slate-500 transition-colors">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold tracking-tight text-white">Workspace Settings</h1>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
        <div className="max-w-3xl mx-auto space-y-12">
          {/* Account Section */}
          <section className="space-y-6">
            <div className="flex items-center gap-2 text-indigo-400">
              <User size={18} />
              <h2 className="font-bold text-xs uppercase tracking-[0.2em]">Account Profile</h2>
            </div>
            <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 grid grid-cols-2 gap-8">
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Full Name</p>
                <p className="text-sm font-medium text-white">Alex Rivera</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Email Address</p>
                <p className="text-sm font-medium text-white">alex@peblo.ai</p>
              </div>
            </div>
          </section>

          {/* Preferences */}
          <section className="space-y-6">
            <div className="flex items-center gap-2 text-purple-400">
              <Zap size={18} />
              <h2 className="font-bold text-xs uppercase tracking-[0.2em]">Neural Preferences</h2>
            </div>
            <div className="space-y-3">
              <SettingsToggle label="Dark Luxury Mode" active />
              <SettingsToggle label="AI Auto-Suggestions" active />
              <SettingsToggle label="Real-time Collaboration" />
            </div>
          </section>

          {/* Security */}
          <section className="space-y-6">
            <div className="flex items-center gap-2 text-emerald-400">
              <Shield size={18} />
              <h2 className="font-bold text-xs uppercase tracking-[0.2em]">Security Link</h2>
            </div>
            <button className="w-full bg-slate-900 border border-slate-800 hover:border-indigo-500/30 py-4 rounded-xl text-sm font-bold transition-all text-slate-300">
              Change Security Password
            </button>
          </section>
        </div>
      </div>
    </div>
  )
}

function SettingsToggle({ label, active = false }) {
  return (
    <div className="flex items-center justify-between p-4 bg-slate-900/20 border border-slate-800 rounded-xl">
      <span className="text-sm font-medium text-slate-300">{label}</span>
      <div className={`w-10 h-5 rounded-full relative transition-all ${active ? 'bg-indigo-600' : 'bg-slate-800'}`}>
        <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${active ? 'right-1' : 'left-1'}`}></div>
      </div>
    </div>
  )
}
