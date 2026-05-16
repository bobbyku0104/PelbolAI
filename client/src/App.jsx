import { Bot, Mail, Lock, Eye } from 'lucide-react'

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {/* Branding Header */}
      <div className="flex flex-col items-center mb-8 text-center">
        <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700 shadow-xl mb-4">
          <Bot className="w-8 h-8 text-indigo-400" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight mb-1">Peblo AI</h1>
        <p className="text-slate-400 text-sm">Focus deep. Create faster.</p>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-[400px] bg-card-bg backdrop-blur-md border border-slate-800/50 p-8 rounded-2xl shadow-2xl">
        <form className="space-y-6">
          {/* Email Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 ml-1">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
              <input 
                type="email" 
                placeholder="name@company.com"
                className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl py-3 pl-10 pr-4 outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all placeholder:text-slate-600 text-slate-200"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
              <label className="text-sm font-medium text-slate-300">Password</label>
              <a href="#" className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors font-medium">Forgot password?</a>
            </div>
            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl py-3 pl-10 pr-10 outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all placeholder:text-slate-600 text-slate-200"
              />
              <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors">
                <Eye className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Sign In Button */}
          <div className="pt-2">
            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-brand-indigo via-brand-purple to-brand-indigo bg-[length:200%_auto] hover:bg-right transition-all duration-500 py-3 rounded-xl font-semibold shadow-lg shadow-indigo-500/20 active:scale-[0.98]"
            >
              Sign In
            </button>
          </div>

          {/* Divider */}
          <div className="relative flex items-center justify-center py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-800"></div>
            </div>
            <span className="relative px-3 bg-[#0d0d0d] text-[10px] font-bold text-slate-500 tracking-widest uppercase">
              Or continue with
            </span>
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 bg-slate-900/50 hover:bg-slate-800/80 border border-slate-800 rounded-xl py-2.5 transition-all group">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5 grayscale group-hover:grayscale-0 transition-all" />
              <span className="text-sm font-medium text-slate-300">Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 bg-slate-900/50 hover:bg-slate-800/80 border border-slate-800 rounded-xl py-2.5 transition-all group">
              <img src="https://www.svgrepo.com/show/511330/apple-173.svg" alt="Apple" className="w-5 h-5 invert opacity-50 group-hover:opacity-100 transition-all" />
              <span className="text-sm font-medium text-slate-300">Apple</span>
            </button>
          </div>
        </form>
      </div>
      {/* Footer Links */}
      <div className="mt-8 text-center space-y-6">
        <p className="text-sm text-slate-400">
          Don't have an account? <a href="#" className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">Sign Up</a>
        </p>
        
        <div className="flex gap-6 text-xs text-slate-600">
          <a href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-slate-400 transition-colors">Terms of Service</a>
        </div>
      </div>
    </div>
  )
}

export default App
