import { useState, useRef, useEffect } from 'react'

/* ── colour palette per activity index (cycles) ── */
const ACCENT_COLORS = [
  { bg: 'rgba(99,102,241,0.08)',  border: 'rgba(99,102,241,0.25)',  text: 'text-indigo-300',  dot: 'bg-indigo-500',  badge: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/20' },
  { bg: 'rgba(244,63,94,0.08)',   border: 'rgba(244,63,94,0.25)',   text: 'text-rose-300',    dot: 'bg-rose-500',    badge: 'bg-rose-500/15 text-rose-300 border-rose-500/20' },
  { bg: 'rgba(20,184,166,0.08)',  border: 'rgba(20,184,166,0.25)',  text: 'text-teal-300',    dot: 'bg-teal-500',    badge: 'bg-teal-500/15 text-teal-300 border-teal-500/20' },
  { bg: 'rgba(245,158,11,0.08)',  border: 'rgba(245,158,11,0.25)',  text: 'text-amber-300',   dot: 'bg-amber-500',   badge: 'bg-amber-500/15 text-amber-300 border-amber-500/20' },
  { bg: 'rgba(139,92,246,0.08)',  border: 'rgba(139,92,246,0.25)',  text: 'text-violet-300',  dot: 'bg-violet-500',  badge: 'bg-violet-500/15 text-violet-300 border-violet-500/20' },
  { bg: 'rgba(16,185,129,0.08)',  border: 'rgba(16,185,129,0.25)',  text: 'text-emerald-300', dot: 'bg-emerald-500', badge: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/20' },
]

function guessIcon(activity) {
  const name = (activity.activity_name + ' ' + activity.description).toLowerCase()
  if (name.includes('lunch') || name.includes('dinner') || name.includes('breakfast') || name.includes('eat') || name.includes('restaurant') || name.includes('caf')) return '\uD83C\uDF7D\uFE0F'
  if (name.includes('walk') || name.includes('stroll') || name.includes('hike')) return '\uD83D\uDEB6'
  if (name.includes('museum') || name.includes('gallery') || name.includes('exhibit')) return '\uD83C\uDFDB\uFE0F'
  if (name.includes('market') || name.includes('shop')) return '\uD83D\uDECD\uFE0F'
  if (name.includes('park') || name.includes('garden') || name.includes('nature')) return '\uD83C\uDF3F'
  if (name.includes('castle') || name.includes('palace') || name.includes('fortress')) return '\uD83C\uDFF0'
  if (name.includes('church') || name.includes('cathedral')) return '\u26EA'
  if (activity.estimated_cost === 0 || activity.estimated_cost === '0') return '\u2728'
  return '\uD83D\uDCCD'
}

/* ───────── Hero banner ───────── */
function HeroBanner({ itinerary }) {
  const totalActivities = itinerary.daily_plans.reduce((s, d) => s + d.activities.length, 0)
  const days = itinerary.daily_plans.length

  return (
    <div className="relative overflow-hidden rounded-3xl mb-12 animate-fade-up">
      {/* Multi-layer gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-slate-900 to-violet-950" />
      <div className="absolute inset-0" style={{
        backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(99,102,241,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(139,92,246,0.25) 0%, transparent 50%), radial-gradient(circle at 50% 100%, rgba(168,85,247,0.15) 0%, transparent 40%)',
      }} />
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }} />

      <div className="relative z-10 px-10 pt-12 pb-10">
        <div className="flex items-start justify-between mb-8">
          <div>
            <p className="text-indigo-300 text-xs font-bold uppercase tracking-[0.25em] mb-3">
              Your itinerary
            </p>
            <h1 className="text-6xl font-black text-white tracking-tight leading-none">
              {itinerary.city}
            </h1>
          </div>
          <div className="text-right mt-2">
            <div className="inline-flex items-center gap-2 glass-light rounded-full px-4 py-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold text-emerald-300">Ready</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <StatCard icon="💰" value={`${Number(itinerary.total_estimated_cost).toLocaleString()}`} label={itinerary.currency} />
          <StatCard icon="📅" value={days} label={days === 1 ? 'Day' : 'Days'} />
          <StatCard icon="⚡" value={totalActivities} label="Activities" />
        </div>
      </div>
    </div>
  )
}

function StatCard({ icon, value, label }) {
  return (
    <div className="glass rounded-2xl px-5 py-4 text-center">
      <span className="text-lg block mb-1">{icon}</span>
      <div className="text-3xl font-black text-white leading-none">{value}</div>
      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">{label}</div>
    </div>
  )
}

/* ───────── Day navigation ───────── */
function DayNav({ days, activeDayIdx, onSelect }) {
  return (
    <div className="fixed left-5 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center gap-2">
      <div className="glass rounded-2xl p-2 flex flex-col items-center gap-2">
        {days.map((day, i) => (
          <button
            key={i}
            onClick={() => onSelect(i)}
            className={`group relative w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer transition-all ${
              i === activeDayIdx
                ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/30'
                : 'text-slate-500 hover:bg-white/5 hover:text-white'
            }`}
          >
            <span className="text-xs font-black">{day.day_number}</span>
            <span className="absolute left-full ml-3 bg-slate-800 border border-slate-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition-all shadow-xl">
              Day {day.day_number} &middot; {day.date}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

/* ───────── Day section ───────── */
function DaySection({ day, dayIndex, currency, sectionRef }) {
  return (
    <section ref={sectionRef} className="mb-16 scroll-mt-24 animate-fade-up" style={{ animationDelay: `${dayIndex * 150}ms` }}>
      {/* Day header */}
      <div className="flex items-center gap-5 mb-8">
        <div className="flex-shrink-0 w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex flex-col items-center justify-center text-white shadow-xl shadow-indigo-500/20">
          <span className="text-[10px] font-bold uppercase tracking-wider opacity-70">Day</span>
          <span className="text-3xl font-black leading-none">{day.day_number}</span>
        </div>
        <div className="flex-1">
          <div className="text-xl font-bold text-white">{day.date}</div>
          <div className="flex items-center gap-2 mt-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-light text-xs font-semibold text-amber-300">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
              {day.daily_weather_forecast}
            </span>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative pl-10">
        {/* Vertical line */}
        <div className="absolute left-4 top-3 bottom-3 w-px" style={{
          background: 'linear-gradient(to bottom, rgba(99,102,241,0.3), rgba(139,92,246,0.1), transparent)',
        }} />

        {day.activities.map((act, i) => {
          const color = ACCENT_COLORS[i % ACCENT_COLORS.length]
          const icon = guessIcon(act)
          const costStr = act.estimated_cost > 0
            ? `${Number(act.estimated_cost).toLocaleString()} ${currency}`
            : 'Free'
          const isFree = act.estimated_cost === 0 || act.estimated_cost === '0'

          return (
            <div key={i} className="relative mb-5 last:mb-0 group">
              {/* Timeline dot */}
              <div className={`absolute -left-6 top-6 w-4 h-4 rounded-full ${color.dot} border-2 border-slate-900 shadow-lg z-10 group-hover:scale-125 transition-transform`} />

              {/* Card */}
              <div
                className="rounded-2xl p-6 transition-all hover:translate-x-1 hover:shadow-xl"
                style={{
                  background: color.bg,
                  border: `1px solid ${color.border}`,
                }}
              >
                {/* Time + Cost header */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-xs font-black ${color.text} uppercase tracking-widest`}>
                    {act.time_slot}
                  </span>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full border ${isFree ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/20' : color.badge}`}>
                    {costStr}
                  </span>
                </div>

                {/* Title row */}
                <div className="flex items-start gap-3 mb-1">
                  <span className="text-2xl mt-0.5">{icon}</span>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white leading-snug">
                      {act.activity_name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                      {act.location} &middot; {act.neighborhood}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-300 leading-relaxed mt-3 mb-5 pl-0">
                  {act.description}
                </p>

                {/* Bottom metadata pills */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                  {act.transport_to_next && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl glass text-xs text-slate-300">
                      <svg className="w-3 h-3 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                      {act.transport_to_next}
                    </span>
                  )}
                  {act.weather_contingency && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl glass text-xs text-slate-300">
                      <svg className="w-3 h-3 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>
                      {act.weather_contingency}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

/* ───────── Travel advice ───────── */
function AdviceFooter({ advice }) {
  return (
    <div className="relative overflow-hidden rounded-3xl mb-10 animate-fade-up">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-900/30 to-orange-900/20" />
      <div className="absolute inset-0" style={{
        backgroundImage: 'radial-gradient(circle at 90% 20%, rgba(245,158,11,0.15) 0%, transparent 50%)',
      }} />
      <div className="relative z-10 p-8 border border-amber-500/15 rounded-3xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center text-lg">
            {'\uD83D\uDCA1'}
          </div>
          <h3 className="text-sm font-black text-amber-300 uppercase tracking-widest">
            Insider tips
          </h3>
        </div>
        <p className="text-base text-amber-100/80 leading-relaxed">
          {advice}
        </p>
      </div>
    </div>
  )
}

/* ───────── Main export ───────── */
export default function ItineraryView({ itinerary, onReset }) {
  const [activeDayIdx, setActiveDayIdx] = useState(0)
  const sectionRefs = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = sectionRefs.current.indexOf(entry.target)
            if (idx !== -1) setActiveDayIdx(idx)
          }
        }
      },
      { rootMargin: '-30% 0px -60% 0px' }
    )
    sectionRefs.current.forEach(el => el && observer.observe(el))
    return () => observer.disconnect()
  }, [itinerary])

  function scrollToDay(idx) {
    sectionRefs.current[idx]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="max-w-4xl mx-auto">
      <HeroBanner itinerary={itinerary} />

      <DayNav
        days={itinerary.daily_plans}
        activeDayIdx={activeDayIdx}
        onSelect={scrollToDay}
      />

      {itinerary.daily_plans.map((day, i) => (
        <DaySection
          key={i}
          day={day}
          dayIndex={i}
          currency={itinerary.currency}
          sectionRef={el => (sectionRefs.current[i] = el)}
        />
      ))}

      <AdviceFooter advice={itinerary.final_travel_advice} />

      {/* Reset */}
      <div className="text-center mb-16">
        <button
          onClick={onReset}
          className="group relative px-8 py-3.5 rounded-2xl font-bold text-sm text-white cursor-pointer overflow-hidden transition-all active:scale-95"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-violet-600 group-hover:from-indigo-500 group-hover:to-violet-500 transition-all" />
          <span className="relative z-10 flex items-center gap-2">
            Plan another trip
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </span>
        </button>
      </div>
    </div>
  )
}
