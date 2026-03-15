import { useState } from 'react'
import TripForm from './components/TripForm'
import LoadingState from './components/LoadingState'
import ItineraryView from './components/ItineraryView'

const AGENTS = [
  { icon: '\uD83D\uDDFA\uFE0F', name: 'Urban Navigator',    desc: 'Mapping neighbourhoods & transit routes' },
  { icon: '\uD83C\uDFAD',       name: 'Culture Curator',     desc: 'Discovering hidden cultural gems' },
  { icon: '\uD83C\uDF7D\uFE0F', name: 'Gastronomy Scout',    desc: 'Scouting restaurants for your budget' },
  { icon: '\uD83D\uDCB0',       name: 'Budget Balancer',     desc: 'Auditing costs & finding savings' },
  { icon: '\u23F0',              name: 'Time Orchestrator',   desc: 'Building your day-by-day schedule' },
]

export default function App() {
  const [view, setView] = useState('form')
  const [itinerary, setItinerary] = useState(null)
  const [error, setError] = useState(null)
  const [formSnapshot, setFormSnapshot] = useState(null)

  async function handleSubmit(formData) {
    setFormSnapshot(formData)
    setView('loading')
    setError(null)

    try {
      const res = await fetch('/api/plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}))
        throw new Error(errData.detail || `Server error ${res.status}`)
      }
      const data = await res.json()
      setItinerary(data)
      setView('result')
    } catch (err) {
      setError(err.message)
      setView('form')
    }
  }

  function handleReset() {
    setItinerary(null)
    setError(null)
    setFormSnapshot(null)
    setView('form')
  }

  return (
    <div className="min-h-screen relative">
      {/* Global background */}
      <div className="fixed inset-0 -z-10" style={{
        background: 'radial-gradient(ellipse 80% 60% at 50% -20%, rgba(99,102,241,0.15) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 50%, rgba(139,92,246,0.08) 0%, transparent 50%), radial-gradient(ellipse 60% 40% at 10% 80%, rgba(99,102,241,0.06) 0%, transparent 50%), #0f0f1a',
      }} />

      {/* Navbar */}
      <nav className="sticky top-0 z-50 glass border-b border-white/5">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={handleReset} className="group flex items-center gap-3 cursor-pointer">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-shadow">
              <span className="text-white text-sm font-black">R</span>
            </div>
            <span className="text-xl font-extrabold tracking-tight text-white">
              Roam<span className="text-indigo-400">ly</span>
            </span>
          </button>

          {view === 'result' && (
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2 rounded-xl glass-light text-sm font-semibold text-indigo-300 hover:text-white cursor-pointer transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              New trip
            </button>
          )}
        </div>
      </nav>

      {/* Main content */}
      <main className={`mx-auto px-6 ${view === 'result' ? 'max-w-5xl py-8' : 'max-w-2xl py-6'}`}>
        {view === 'form' && (
          <div className="animate-fade-up">
            {error && (
              <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm flex items-center gap-3">
                <span className="text-red-400 text-lg">&#9888;</span>
                <span><strong>Something went wrong:</strong> {error}</span>
              </div>
            )}
            <TripForm onSubmit={handleSubmit} />
          </div>
        )}

        {view === 'loading' && (
          <LoadingState agents={AGENTS} city={formSnapshot?.city} />
        )}

        {view === 'result' && itinerary && (
          <ItineraryView itinerary={itinerary} onReset={handleReset} />
        )}
      </main>
    </div>
  )
}
