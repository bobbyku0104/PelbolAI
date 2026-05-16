import { useState } from 'react'
import { Check } from 'lucide-react'
import Sidebar from '../components/dashboard/Sidebar'
import EditorToolbar from '../components/dashboard/EditorToolbar'
import AIAssistantSidebar from '../components/dashboard/AIAssistantSidebar'

export default function EditorPage({ onLogout, onBack }) {
  const [isSaving, setIsSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState('idle') // idle, saving, success

  const handleSave = () => {
    setSaveStatus('saving')
    setTimeout(() => {
      setSaveStatus('success')
      setTimeout(() => setSaveStatus('idle'), 2000)
    }, 1500)
  }
  return (
    <div className="flex h-screen bg-black text-white">
      <Sidebar onLogout={onLogout} activePage="Recent Notes" />

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Floating Toolbar */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 z-20">
          <EditorToolbar />
        </div>

        {/* Scrollable Editor Area */}
        <div className="flex-1 overflow-auto p-20 pt-32 custom-scrollbar">
          <div className="max-w-3xl mx-auto space-y-12">
            <h1 className="text-6xl font-bold tracking-tight leading-tight">
              The Future of Neural Synthesis
            </h1>
            
            <div className="prose prose-invert max-w-none space-y-8 text-slate-300 text-lg leading-relaxed">
              <p>
                In the quiet corners of the digital architecture, a new form of cognitive resonance is 
                beginning to emerge. This isn't merely the simulation of intelligence, but an architectural 
                synthesis of pattern and intent—a neural canvas that bridges the gap between raw 
                data and human intuition.
              </p>
              
              <p>
                We are standing at the precipice of "Quiet Productivity," where tools no longer shout 
                for attention but whisper insights. The glassmorphic interface of our current workspace 
                reflects this philosophy: translucent, layered, and deep. It invites focus through 
                atmospheric clarity rather than mechanical rigidity.
              </p>

              <div className="border-l-2 border-indigo-500 pl-8 py-2 my-12">
                <p className="text-2xl font-medium text-white italic">
                  "Complexity is the noise; synthesis is the signal."
                </p>
              </div>

              <p>
                The synthesis occurs in the transition layers. When we write, we aren't just recording 
                strings of characters; we are training a distributed consciousness to understand our 
                creative velocity. The AI doesn't replace the writer; it provides the gravitational pull 
                that keeps the ideas in orbit.
              </p>
              
              <p>
                As we move forward, the boundaries between the tool and the thought will continue to 
                blur. The editor becomes an extension of the nervous system—a reactive, glowing 
                medium that anticipates the next logical leap in human reasoning. This is the promise 
                of Peblo AI: the refinement of complexity into pure, actionable brilliance.
              </p>
            </div>

            <div className="pt-20 flex gap-4">
              <button 
                onClick={onBack}
                className="px-8 py-3 bg-slate-900 border border-slate-800 rounded-xl font-bold hover:bg-slate-800 transition-all active:scale-[0.98]"
              >
                Delete Note
              </button>
              <button 
                onClick={handleSave}
                className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-indigo-400 text-black font-bold rounded-xl hover:opacity-90 transition-all active:scale-[0.98] flex items-center gap-2 min-w-[140px] justify-center"
              >
                {saveStatus === 'saving' ? (
                  <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></span>
                ) : saveStatus === 'success' ? (
                  <><Check size={18} /> Saved</>
                ) : (
                  'Save Note'
                )}
              </button>
            </div>
          </div>
        </div>
      </main>

      <AIAssistantSidebar />
    </div>
  )
}
