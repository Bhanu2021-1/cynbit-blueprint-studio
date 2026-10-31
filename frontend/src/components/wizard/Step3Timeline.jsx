import React from 'react'
import { motion } from 'framer-motion'
import { Clock, IndianRupee, AlertCircle } from 'lucide-react'

const TIMELINE_OPTIONS = [
  { id: 'UNDER_3_MONTHS', label: 'Under 3 months', tag: 'Expedited', note: 'Requires tight scope control and fast review cycles.' },
  { id: 'THREE_TO_SIX_MONTHS', label: '3 – 6 months', tag: 'Standard', note: 'Ideal for a focused MVP with clear requirements.' },
  { id: 'SIX_TO_TWELVE_MONTHS', label: '6 – 12 months', tag: 'Extended', note: 'Multiple workstreams with richer feature scope.' },
  { id: 'OVER_TWELVE_MONTHS', label: '12+ months', tag: 'Programme', note: 'Multi-phase enterprise initiative with ongoing delivery.' },
]

const BUDGET_OPTIONS = [
  { id: 'UNDER_50K', label: 'Under ₹50L', sub: 'Seed / bootstrap' },
  { id: 'RANGE_50K_200K', label: '₹50L – ₹2Cr', sub: 'Growth-stage investment' },
  { id: 'RANGE_200K_500K', label: '₹2Cr – ₹5Cr', sub: 'Scale-up programme' },
  { id: 'OVER_500K', label: '₹5Cr+', sub: 'Enterprise initiative' },
]

function FieldError({ message }) {
  if (!message) return null
  return (
    <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400">
      <AlertCircle size={12} className="shrink-0" />
      {message}
    </p>
  )
}

function OptionGroup({ icon: Icon, title, hint, children }) {
  return (
    <div>
      <div className="flex items-center gap-2.5 mb-3">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#1a2d48]/80 bg-[#0d1421]">
          <Icon size={14} className="text-cyan-500/80" strokeWidth={1.5} />
        </div>
        <div>
          <p className="text-sm font-semibold text-white leading-none">{title}</p>
          {hint && <p className="text-[11px] text-slate-600 mt-0.5">{hint}</p>}
        </div>
      </div>
      {children}
    </div>
  )
}

export default function Step3Timeline({ formData, onChange, errors }) {
  return (
    <div>
      <div className="mb-7">
        <h2 className="text-xl sm:text-2xl font-semibold text-white mb-1.5 tracking-tight">
          Timeline & budget range
        </h2>
        <p className="text-sm text-slate-400">
          Indicative only — helps calibrate scope and engagement model. Confirmed after a discovery call.
        </p>
      </div>

      <div className="space-y-8">
        {/* ── Timeline ── */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
          <OptionGroup icon={Clock} title="Preferred timeline">
            <FieldError message={errors?.timeline} />
            <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {TIMELINE_OPTIONS.map(opt => {
                const selected = formData.timeline === opt.id
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => onChange('timeline', opt.id)}
                    aria-pressed={selected}
                    className={[
                      'text-left rounded-xl border p-4 transition-all duration-150',
                      'focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400',
                      selected
                        ? 'border-cyan-500/45 bg-cyan-500/[0.06] shadow-[0_0_18px_rgba(6,182,212,0.08)]'
                        : 'border-[#1a2d48]/80 bg-[#0d1421] hover:border-[#2a4268] hover:bg-[#121c2e]',
                    ].join(' ')}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-[13px] font-semibold ${selected ? 'text-cyan-300' : 'text-white'}`}>
                        {opt.label}
                      </span>
                      <span className={`text-[9px] font-bold tracking-wide uppercase px-1.5 py-0.5 rounded ${
                        selected ? 'bg-cyan-400/15 text-cyan-400' : 'bg-[#1a2d48]/60 text-slate-600'
                      }`}>
                        {opt.tag}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 italic">{opt.note}</p>
                  </button>
                )
              })}
            </div>
          </OptionGroup>
        </motion.div>

        {/* ── Budget ── */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.09 }}>
          <OptionGroup
            icon={IndianRupee}
            title="Indicative budget range"
            hint="No commitment required — helps propose the right engagement model"
          >
            <FieldError message={errors?.budgetRange} />
            <div className="mt-2 grid grid-cols-2 gap-2.5">
              {BUDGET_OPTIONS.map(opt => {
                const selected = formData.budgetRange === opt.id
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => onChange('budgetRange', opt.id)}
                    aria-pressed={selected}
                    className={[
                      'text-left rounded-xl border p-4 transition-all duration-150',
                      'focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400',
                      selected
                        ? 'border-cyan-500/45 bg-cyan-500/[0.06] shadow-[0_0_18px_rgba(6,182,212,0.08)]'
                        : 'border-[#1a2d48]/80 bg-[#0d1421] hover:border-[#2a4268] hover:bg-[#121c2e]',
                    ].join(' ')}
                  >
                    <div className="flex items-center justify-between mb-0.5">
                      <span className={`text-[13px] font-semibold leading-snug ${selected ? 'text-cyan-300' : 'text-white'}`}>
                        {opt.label}
                      </span>
                      {selected && (
                        <motion.span
                          initial={{ scale: 0 }} animate={{ scale: 1 }}
                          className="h-2 w-2 rounded-full bg-cyan-400 shrink-0"
                        />
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500">{opt.sub}</p>
                  </button>
                )
              })}
            </div>
          </OptionGroup>
        </motion.div>
      </div>
    </div>
  )
}
