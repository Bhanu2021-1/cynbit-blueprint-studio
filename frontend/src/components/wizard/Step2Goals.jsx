import React from 'react'
import { motion } from 'framer-motion'
import { AlertCircle } from 'lucide-react'

const CAPABILITIES_BY_SERVICE = {
  AI_AUTOMATION: [
    'Workflow Automation', 'Autonomous Agents', 'NLP / Intent Detection',
    'Analytics & Reporting', 'Predictive Modelling', 'CRM Integration',
    'ERP Integration', 'Email Automation', 'Inventory Management', 'Anomaly Detection',
  ],
  SOFTWARE_DEVELOPMENT: [
    'User Authentication', 'Dashboard & Analytics', 'REST APIs',
    'Admin Panel', 'Mobile / PWA', 'Real-Time Notifications', 'Payment Integration',
    'Multi-Tenancy', 'Reporting', 'Third-Party Integrations',
  ],
  CLOUD_INFRASTRUCTURE: [
    'Infrastructure as Code', 'CI/CD Pipeline', 'Container Orchestration',
    'Observability & Monitoring', 'Security & Compliance', 'Cost Optimisation',
    'Disaster Recovery', 'Multi-Cloud Strategy', 'Cloud Migration', 'Serverless',
  ],
  DIGITAL_MARKETING: [
    'Technical SEO', 'Analytics Setup', 'Content Strategy', 'Performance Marketing',
    'Email Marketing', 'CRO / A/B Testing', 'Social Media', 'International SEO',
    'Marketing Automation', 'Reporting Dashboards',
  ],
}

const COMPLEXITY_OPTIONS = [
  {
    id: 'SMALL',
    label: 'Focused',
    badge: 'MVP',
    description: 'Well-scoped MVP, 1–2 core capabilities',
    note: 'e.g. single automation workflow, marketing audit',
  },
  {
    id: 'MEDIUM',
    label: 'Mid-Scale',
    badge: 'Growth',
    description: 'Multiple modules, 3–5 integrations, cross-functional',
    note: 'e.g. SaaS dashboard, multi-step automation platform',
  },
  {
    id: 'LARGE',
    label: 'Large-Scale',
    badge: 'Scale',
    description: 'Complex domain, many integrations, extended timeline',
    note: 'e.g. enterprise portal, cloud migration programme',
  },
  {
    id: 'ENTERPRISE',
    label: 'Enterprise',
    badge: 'Enterprise',
    description: 'Mission-critical, strict SLAs, compliance requirements',
    note: 'e.g. platform rebuild, regulated industry deployment',
  },
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

export default function Step2Goals({ formData, onChange, errors }) {
  const capabilities = CAPABILITIES_BY_SERVICE[formData.serviceType] || []
  const charCount = (formData.businessGoals || '').length

  const toggleCapability = (cap) => {
    const current = formData.keyCapabilities || []
    onChange('keyCapabilities', current.includes(cap)
      ? current.filter(c => c !== cap)
      : [...current, cap])
  }

  return (
    <div className="space-y-8">

      {/* ── Business goals ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div className="flex items-baseline justify-between mb-2">
          <label className="text-sm font-semibold text-white" htmlFor="business-goals">
            Describe your business goals
          </label>
          <span className={`text-xs tabular-nums transition-colors ${charCount > 1800 ? 'text-amber-400' : 'text-slate-600'}`}>
            {charCount}<span className="text-slate-700">/2000</span>
          </span>
        </div>
        <textarea
          id="business-goals"
          value={formData.businessGoals || ''}
          onChange={e => onChange('businessGoals', e.target.value)}
          rows={4}
          placeholder="e.g. We want to automate our customer onboarding process, reduce manual order processing by 70%, and gain real-time visibility into inventory levels across our 3 warehouses…"
          aria-describedby={errors?.businessGoals ? 'goals-error' : 'goals-hint'}
          className={[
            'w-full rounded-xl px-4 py-3 text-sm text-slate-200 leading-relaxed resize-none',
            'bg-[#0d1421] border placeholder:text-slate-700',
            'transition-all duration-150',
            'focus:outline-none focus:ring-2 focus:ring-offset-0',
            errors?.businessGoals
              ? 'border-red-500/50 focus:ring-red-500/30 focus:border-red-500/60'
              : 'border-[#1a2d48]/80 focus:ring-cyan-500/25 focus:border-cyan-500/40',
          ].join(' ')}
        />
        {errors?.businessGoals
          ? <FieldError message={errors.businessGoals} />
          : <p id="goals-hint" className="mt-1.5 text-xs text-slate-600">Minimum 10 characters. The more detail, the more specific your blueprint.</p>
        }
      </motion.div>

      {/* ── Key capabilities ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.07 }}
      >
        <div className="flex items-baseline justify-between mb-3">
          <label className="text-sm font-semibold text-white">
            Key capabilities needed
          </label>
          {(formData.keyCapabilities || []).length > 0 && (
            <span className="text-xs text-cyan-500">{(formData.keyCapabilities || []).length} selected</span>
          )}
        </div>
        {errors?.keyCapabilities && <FieldError message={errors.keyCapabilities} />}
        <div className="mt-2 flex flex-wrap gap-2">
          {capabilities.map((cap, i) => {
            const isSelected = (formData.keyCapabilities || []).includes(cap)
            return (
              <motion.button
                key={cap}
                type="button"
                onClick={() => toggleCapability(cap)}
                initial={{ opacity: 0, scale: 0.93 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: i * 0.025 }}
                aria-pressed={isSelected}
                className={[
                  'rounded-full px-3.5 py-1.5 text-xs font-medium border transition-all duration-150',
                  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400 focus-visible:outline-offset-1',
                  isSelected
                    ? 'bg-cyan-500/[0.12] border-cyan-500/45 text-cyan-300'
                    : 'bg-[#0d1421] border-[#1a2d48]/80 text-slate-500 hover:border-[#2a4268] hover:text-slate-300',
                ].join(' ')}
              >
                {cap}
              </motion.button>
            )
          })}
        </div>
      </motion.div>

      {/* ── Complexity ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.13 }}
      >
        <label className="block text-sm font-semibold text-white mb-3">
          Project complexity
        </label>
        {errors?.complexity && <FieldError message={errors.complexity} />}
        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {COMPLEXITY_OPTIONS.map(opt => {
            const selected = formData.complexity === opt.id
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => onChange('complexity', opt.id)}
                aria-pressed={selected}
                className={[
                  'group text-left rounded-xl border p-4 transition-all duration-150',
                  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400',
                  selected
                    ? 'border-cyan-500/45 bg-cyan-500/[0.06] shadow-[0_0_20px_rgba(6,182,212,0.08)]'
                    : 'border-[#1a2d48]/80 bg-[#0d1421] hover:border-[#2a4268] hover:bg-[#121c2e]',
                ].join(' ')}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-[13px] font-semibold ${selected ? 'text-cyan-300' : 'text-white'}`}>
                    {opt.label}
                  </span>
                  <span className={`text-[9px] font-bold tracking-wider uppercase px-1.5 py-0.5 rounded ${
                    selected ? 'bg-cyan-400/15 text-cyan-400' : 'bg-[#1a2d48]/80 text-slate-600'
                  }`}>
                    {opt.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mb-0.5">{opt.description}</p>
                <p className="text-[11px] text-slate-600 italic">{opt.note}</p>
              </button>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}
