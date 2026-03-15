import { useState, useEffect } from 'react'

const TIPS = [
  'Comparing local transit options...',
  'Checking opening hours for hidden gems...',
  'Scanning menus for dietary options...',
  'Cross-referencing weather forecasts...',
  'Optimising neighbourhood clusters...',
  'Balancing costs against your budget...',
  'Scheduling around peak hours...',
]

export default function LoadingState({ agents, city }) {
  const [activeIdx, setActiveIdx] = useState(0)
  const [tipIdx, setTipIdx] = useState(0)
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIdx(prev => (prev < agents.length - 1 ? prev + 1 : prev))
    }, 12000)
    return () => clearInterval(interval)
  }, [agents.length])

  useEffect(() => {
    const interval = setInterval(() => {
      setTipIdx(prev => (prev + 1) % TIPS.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => setElapsed(e => e + 1), 1000)
    return () => clearInterval(interval)
  }, [])

  const pct = Math.min(((activeIdx + 1) / agents.length) * 100, 100)
  const mins = Math.floor(elapsed / 60)
  const secs = elapsed % 60

  return (
    <div className="flex flex-col items-center pt-12 animate-fade-up">
      {/* Central animated orb */}
      <div className="relative w-48 h-48 mb-10">
        {/* Outer glow ring */}
        <div className="absolute inset-0 rounded-full animate-pulse-glow" style={{
          background: 'radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)',
          transform: 'scale(1.8)',
        }} />

        {/* Orbiting dots */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute w-3 h-3 rounded-full bg-indigo-400 animate-orbit" style={{ animationDuration: '6s' }} />
          <div className="absolute w-2 h-2 rounded-full bg-violet-400 animate-orbit-reverse" style={{ animationDuration: '4.5s' }} />
          <div className="absolute w-2.5 h-2.5 rounded-full bg-purple-400 animate-orbit" style={{ animationDuration: '8s' }} />
        </div>

        {/* Centre circle */}
        <div className="absolute inset-6 rounded-full bg-gradient-to-br from-indigo-600 to-violet-700 flex flex-col items-center justify-center shadow-2xl shadow-indigo-500/30">
          <span className="text-3xl mb-1">{agents[activeIdx]?.icon}</span>
          <span className="text-[10px] font-bold text-indigo-200 uppercase tracking-wider">
            Agent {activeIdx + 1}/{agents.length}
          </span>
        </div>

        {/* Spinning ring */}
        <svg className="absolute inset-0 w-full h-full animate-spin-slow" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(99,102,241,0.1)" strokeWidth="2" />
          <circle cx="100" cy="100" r="90" fill="none" stroke="url(#grad)" strokeWidth="2"
            strokeDasharray="140 425"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#818cf8" />
              <stop offset="100%" stopColor="#7c3aed" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* City + status text */}
      {city && (
        <p className="text-indigo-400 text-xs font-bold uppercase tracking-[0.2em] mb-2">
          Planning {city}
        </p>
      )}
      <h2 className="text-2xl font-black text-white mb-1 tracking-tight">
        {agents[activeIdx]?.name}
      </h2>
      <p className="text-sm text-slate-400 mb-8">
        {agents[activeIdx]?.desc}
      </p>

      {/* Progress bar */}
      <div className="w-full max-w-sm mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Progress</span>
          <span className="text-[10px] font-mono text-slate-500">
            {mins > 0 ? `${mins}m ` : ''}{secs}s
          </span>
        </div>
        <div className="h-2 rounded-full bg-white/5 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-1000 ease-out"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Agent list */}
      <div className="w-full max-w-sm space-y-2 mb-8">
        {agents.map((agent, i) => {
          const done = i < activeIdx
          const active = i === activeIdx

          return (
            <div
              key={agent.name}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-500 ${
                active
                  ? 'glass-light glow-indigo'
                  : done
                  ? 'bg-emerald-500/5 border border-emerald-500/10'
                  : 'bg-white/2 border border-white/3'
              } ${!done && !active ? 'opacity-40' : ''}`}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <span className="text-lg flex-shrink-0">{agent.icon}</span>
              <div className="flex-1 min-w-0">
                <span className={`text-sm font-bold block ${
                  active ? 'text-white' : done ? 'text-emerald-300' : 'text-slate-500'
                }`}>
                  {agent.name}
                </span>
              </div>
              {done && (
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center animate-scale-in">
                  <svg className="w-3.5 h-3.5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
              )}
              {active && (
                <div className="w-6 h-6 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full border-2 border-indigo-400/30 border-t-indigo-400 animate-spin" />
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Rotating tip */}
      <div className="glass rounded-xl px-5 py-3 max-w-sm text-center">
        <p className="text-xs text-slate-400 transition-all" key={tipIdx}>
          {TIPS[tipIdx]}
        </p>
      </div>
    </div>
  )
}
