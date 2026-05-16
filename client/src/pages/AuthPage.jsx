import { useState } from 'react'
import { Mail, Lock, User, Bot, Sparkles } from 'lucide-react'

export default function AuthPage({ isLogin, setIsLogin, onAuth }) {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register'
    
    try {
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Authentication failed')
      }

      localStorage.setItem('peblo_token', data.token)
      localStorage.setItem('peblo_user', JSON.stringify(data))
      
      onAuth(e)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black p-4 selection:bg-indigo-500/30">
      {/* Premium Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="w-full max-w-[440px] z-10">
        {/* Branding */}
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-indigo-500 blur-2xl opacity-20 animate-pulse"></div>
            <div className="relative bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-2xl">
              <Bot className="w-10 h-10 text-indigo-400" />
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tighter text-white mb-2">Peblo AI</h1>
          <p className="text-slate-500 text-sm font-medium">The Future of Neural Note-Taking</p>
        </div>

        {/* Auth Card */}
        <div className="bg-[#0A0A0A] border border-slate-800/60 p-10 rounded-[2rem] shadow-2xl backdrop-blur-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2 mb-8">
              <h2 className="text-2xl font-bold text-white tracking-tight">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
              <p className="text-slate-500 text-xs font-medium uppercase tracking-widest flex items-center gap-2">
                <Sparkles className="w-3 h-3 text-indigo-400" /> Secure Neural Access
              </p>
            </div>

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-xs font-bold text-center animate-shake">
                {error}
              </div>
            )}

            <div className="space-y-4">
              {!isLogin && (
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                  <input 
                    type="text" 
                    placeholder="Full Name" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-slate-900/50 border border-slate-800 rounded-xl py-4 pl-12 pr-4 outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/5 transition-all text-sm text-white placeholder:text-slate-600"
                  />
                </div>
              )}

              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-slate-900/50 border border-slate-800 rounded-xl py-4 pl-12 pr-4 outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/5 transition-all text-sm text-white placeholder:text-slate-600"
                />
              </div>

              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                <input 
                  type="password" 
                  placeholder="Password" 
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full bg-slate-900/50 border border-slate-800 rounded-xl py-4 pl-12 pr-4 outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/5 transition-all text-sm text-white placeholder:text-slate-600"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 py-4 rounded-xl font-bold text-white shadow-xl shadow-indigo-600/20 hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {loading ? 'Decrypting Access...' : isLogin ? 'Sign In' : 'Establish Account'}
            </button>
          </form>

          <div className="mt-8 text-center pt-6 border-t border-slate-800/50">
            <p className="text-sm text-slate-500">
              {isLogin ? "Don't have an account?" : "Already a member?"}{' '}
              <button 
                onClick={() => setIsLogin(!isLogin)} 
                className="text-indigo-400 hover:text-indigo-300 font-bold transition-colors ml-1"
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
