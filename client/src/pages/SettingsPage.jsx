import Sidebar from '../components/dashboard/Sidebar'
import TopBar from '../components/dashboard/TopBar'

export default function SettingsPage({ onLogout, onBack, onOpenCreate }) {
  return (
    <div className="flex h-screen bg-black text-white">
      <Sidebar 
        onLogout={onLogout} 
        onOpenHome={onBack} 
        onOpenCreate={onOpenCreate}
        onOpenRecent={() => {}}
        onOpenGraph={() => {}}
        onOpenSettings={() => {}}
        activePage="Settings" 
      />

      <main className="flex-1 flex flex-col min-w-0">
        <TopBar hideSearch />

        <div className="flex-1 overflow-auto p-10 space-y-12 custom-scrollbar">
          <div>
            <h2 className="text-3xl font-bold mb-2">Settings</h2>
            <p className="text-slate-400 text-sm">Manage your account preferences and workspace configuration.</p>
          </div>

          <div className="max-w-2xl space-y-8">
            <section className="space-y-4">
              <h3 className="text-lg font-bold border-b border-slate-800 pb-2 text-indigo-400">Account</h3>
              <div className="grid grid-cols-2 gap-8">
                <SettingItem label="Full Name" value="Alex Rivera" />
                <SettingItem label="Email" value="alex@peblo.ai" />
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="text-lg font-bold border-b border-slate-800 pb-2 text-indigo-400">Preferences</h3>
              <div className="space-y-4">
                <ToggleItem label="Dark Mode" enabled={true} />
                <ToggleItem label="AI Auto-Suggestions" enabled={true} />
                <ToggleItem label="Desktop Notifications" enabled={false} />
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="text-lg font-bold border-b border-slate-800 pb-2 text-indigo-400">Security</h3>
              <button className="px-6 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm font-bold hover:bg-slate-800 transition-all">
                Change Password
              </button>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}

function SettingItem({ label, value }) {
  return (
    <div className="space-y-1">
      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{label}</p>
      <p className="text-sm font-medium">{value}</p>
    </div>
  )
}

function ToggleItem({ label, enabled }) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm font-medium text-slate-300">{label}</span>
      <div className={`w-10 h-5 rounded-full relative transition-all ${enabled ? 'bg-indigo-600' : 'bg-slate-800'}`}>
        <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${enabled ? 'left-6' : 'left-1'}`}></div>
      </div>
    </div>
  )
}
