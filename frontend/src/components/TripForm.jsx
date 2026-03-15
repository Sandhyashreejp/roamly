import { useState } from 'react'

const INTEREST_OPTIONS = [
  { label: 'Techno culture', icon: '\uD83C\uDFB6' },
  { label: 'History',        icon: '\uD83C\uDFDB\uFE0F' },
  { label: 'Food',           icon: '\uD83C\uDF7D\uFE0F' },
  { label: 'Art',            icon: '\uD83C\uDFA8' },
  { label: 'Fun',            icon: '\uD83C\uDFA2' },
  { label: 'Sustainability', icon: '\uD83C\uDF3F' },
]

const BUDGET_OPTIONS = [
  { value: 'Student',    icon: '\uD83C\uDF93', desc: 'Hostels & street food' },
  { value: 'Mid-range',  icon: '\u2728',       desc: 'Hotels & local dining' },
  { value: 'Luxury',     icon: '\uD83D\uDC8E', desc: 'Finest stays & dining' },
]

function todayStr() {
  return new Date().toISOString().split('T')[0]
}

export default function TripForm({ onSubmit }) {
  const [city, setCity] = useState('')
  const [duration, setDuration] = useState(3)
  const [budget, setBudget] = useState('Mid-range')
  const [startDate, setStartDate] = useState(todayStr())
  const [interests, setInterests] = useState(['Food', 'Art'])

  function toggleInterest(label) {
    setInterests(prev =>
      prev.includes(label) ? prev.filter(i => i !== label) : [...prev, label]
    )
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!city.trim() || interests.length === 0) return
    onSubmit({
      city: city.trim(),
      interests,
      duration_days: duration,
      budget_level: budget,
      start_date: startDate,
    })
  }

  return (
    <div>
      {/* Hero section */}
      <div className="text-center pt-8 pb-12 relative">
        {/* Floating decorative orbs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.4), transparent 70%)' }} />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-light text-xs font-bold text-indigo-300 uppercase tracking-widest mb-6 animate-fade-up">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse-glow" />
            AI-powered itinerary planner
          </div>

          <h1 className="text-5xl font-black tracking-tight text-white leading-tight mb-4 animate-fade-up delay-100" style={{ lineHeight: '1.1' }}>
            Where do you want<br />
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
              to explore?
            </span>
          </h1>

          <p className="text-slate-400 text-base max-w-md mx-auto leading-relaxed animate-fade-up delay-200">
            Five AI agents will research your destination and craft a complete day-by-day travel plan.
          </p>
        </div>
      </div>

      {/* Form card */}
      <form onSubmit={handleSubmit} className="relative">
        <div className="glass rounded-3xl p-8 glow-indigo animate-fade-up delay-300">

          {/* ── City input ── */}
          <div className="mb-8">
            <label className="block mb-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
              Destination
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl pointer-events-none">{'\uD83C\uDF0D'}</span>
              <input
                type="text"
                value={city}
                onChange={e => setCity(e.target.value)}
                placeholder="Barcelona, Kyoto, Berlin, Lisbon..."
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-lg font-medium focus:outline-none focus:border-indigo-500/50 focus:bg-white/8 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                required
              />
            </div>
          </div>

          {/* ── Duration + Date row ── */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div>
              <label className="block mb-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                Duration
              </label>
              <div className="relative flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-3">
                <button
                  type="button"
                  onClick={() => setDuration(d => Math.max(1, d - 1))}
                  className="w-8 h-8 rounded-lg bg-white/10 text-white flex items-center justify-center font-bold text-lg hover:bg-white/20 cursor-pointer transition-colors"
                >-</button>
                <div className="flex-1 text-center">
                  <span className="text-2xl font-black text-white">{duration}</span>
                  <span className="text-xs text-slate-400 ml-1">{duration === 1 ? 'day' : 'days'}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setDuration(d => Math.min(30, d + 1))}
                  className="w-8 h-8 rounded-lg bg-white/10 text-white flex items-center justify-center font-bold text-lg hover:bg-white/20 cursor-pointer transition-colors"
                >+</button>
              </div>
            </div>

            <div>
              <label className="block mb-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                Start date
              </label>
              <input
                type="date"
                value={startDate}
                min={todayStr()}
                onChange={e => setStartDate(e.target.value)}
                className="w-full px-4 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 text-sm font-medium transition-all [color-scheme:dark]"
              />
            </div>
          </div>

          {/* ── Budget level ── */}
          <div className="mb-8">
            <label className="block mb-3 text-xs font-bold text-slate-400 uppercase tracking-widest">
              Budget
            </label>
            <div className="grid grid-cols-3 gap-3">
              {BUDGET_OPTIONS.map(b => {
                const active = budget === b.value
                return (
                  <button
                    key={b.value}
                    type="button"
                    onClick={() => setBudget(b.value)}
                    className={`relative rounded-2xl p-4 text-center cursor-pointer transition-all ${
                      active
                        ? 'bg-indigo-500/15 border-2 border-indigo-500/50 shadow-lg shadow-indigo-500/10'
                        : 'bg-white/3 border-2 border-transparent hover:bg-white/5 hover:border-white/10'
                    }`}
                  >
                    <span className="text-2xl block mb-1">{b.icon}</span>
                    <span className={`text-sm font-bold block ${active ? 'text-indigo-300' : 'text-slate-300'}`}>
                      {b.value}
                    </span>
                    <span className="text-[10px] text-slate-500 block mt-0.5">{b.desc}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* ── Interests ── */}
          <div className="mb-8">
            <label className="block mb-3 text-xs font-bold text-slate-400 uppercase tracking-widest">
              Interests <span className="font-normal text-slate-500 normal-case tracking-normal">(pick at least one)</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {INTEREST_OPTIONS.map(({ label, icon }) => {
                const active = interests.includes(label)
                return (
                  <button
                    key={label}
                    type="button"
                    onClick={() => toggleInterest(label)}
                    className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-semibold cursor-pointer transition-all ${
                      active
                        ? 'bg-gradient-to-r from-indigo-500/20 to-violet-500/20 border border-indigo-500/40 text-white shadow-md shadow-indigo-500/5'
                        : 'bg-white/3 border border-white/5 text-slate-400 hover:bg-white/5 hover:text-slate-300'
                    }`}
                  >
                    <span className="text-base">{icon}</span>
                    {label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* ── Submit ── */}
          <button
            type="submit"
            disabled={!city.trim() || interests.length === 0}
            className="w-full relative py-4 rounded-2xl font-bold text-base text-white cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed overflow-hidden group transition-all active:scale-[0.98]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 group-hover:from-indigo-500 group-hover:via-violet-500 group-hover:to-indigo-500 transition-all" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ boxShadow: 'inset 0 0 40px rgba(255,255,255,0.1)' }} />
            <span className="relative z-10 flex items-center justify-center gap-2">
              Plan my trip
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </span>
          </button>
        </div>

        {/* Powered-by footer */}
        <p className="text-center text-[11px] text-slate-600 mt-5">
          Powered by 5 specialised AI agents &middot; CrewAI
        </p>
      </form>
    </div>
  )
}
