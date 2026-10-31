import React from 'react'
import { motion } from 'framer-motion'
import { User, Building2, CheckCircle2, ShieldCheck } from 'lucide-react'

const SERVICE_LABELS = {
  AI_AUTOMATION: 'AI Automation & Autonomous Agents',
  SOFTWARE_DEVELOPMENT: 'Custom Software Development',
  CLOUD_INFRASTRUCTURE: 'Cloud Infrastructure & Architecture',
  DIGITAL_MARKETING: 'Digital Marketing & Technical SEO',
}
const COMPLEXITY_LABELS = { SMALL: 'Focused', MEDIUM: 'Mid-Scale', LARGE: 'Large-Scale', ENTERPRISE: 'Enterprise' }
const TIMELINE_LABELS = {
  UNDER_3_MONTHS: 'Under 3 months',
  THREE_TO_SIX_MONTHS: '3–6 months',
  SIX_TO_TWELVE_MONTHS: '6–12 months',
  OVER_TWELVE_MONTHS: '12+ months',
}
const BUDGET_LABELS = {
  UNDER_50K: 'Under ₹50L',
  RANGE_50K_200K: '₹50L – ₹2Cr',
  RANGE_200K_500K: '₹2Cr – ₹5Cr',
  OVER_500K: '₹5Cr+',
}

function SummaryRow({ label, value, mono }) {
  return (
    <div className="flex items-start justify-between gap-3 py-2.5 border-b border-[#1a2d48]/50 last:border-0">
      <span className="text-xs text-slate-500 shrink-0 pt-0.5">{label}</span>
      <span className={`text-xs font-medium text-slate-200 text-right ${mono ? 'font-mono' : ''}`}>{value || '—'}</span>
    </div>
  )
}

export default function Step4Review({ formData, onChange }) {
  return (
    <div>
      <div className="mb-7">
        <h2 className="text-xl sm:text-2xl font-semibold text-white mb-1.5 tracking-tight">
          Review & generate
        </h2>
        <p className="text-sm text-slate-400">
          Check your details, add optional personalisation, then generate your blueprint.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* ── Input summary ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="rounded-xl border border-[#1a2d48]/80 bg-[#0d1421] p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 size={14} className="text-cyan-400" />
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Your Inputs</p>
          </div>
          <div>
            <SummaryRow label="Service" value={SERVICE_LABELS[formData.serviceType]} />
            <SummaryRow label="Complexity" value={COMPLEXITY_LABELS[formData.complexity]} />
            <SummaryRow label="Timeline" value={TIMELINE_LABELS[formData.timeline]} />
            <SummaryRow label="Budget Range" value={BUDGET_LABELS[formData.budgetRange]} />
            <SummaryRow
              label="Capabilities"
              value={(formData.keyCapabilities || []).join(', ')}
            />
          </div>

          {formData.businessGoals && (
            <div className="mt-4 rounded-lg bg-[#121c2e] border border-[#1a2d48]/60 p-3">
              <p className="text-[9.5px] text-slate-600 uppercase tracking-widest mb-1.5">Business Goals</p>
              <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                {formData.businessGoals}
              </p>
            </div>
          )}
        </motion.div>

        {/* ── Personalise + notice ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.08 }}
          className="flex flex-col gap-4"
        >
          <div className="rounded-xl border border-[#1a2d48]/80 bg-[#0d1421] p-5 flex-1">
            <div className="flex items-center gap-2 mb-4">
              <User size={13} className="text-slate-500" />
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Personalise <span className="text-slate-700 normal-case font-normal">(optional)</span>
              </p>
            </div>
            <div className="space-y-3.5">
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1.5" htmlFor="contact-name">
                  Your name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={formData.contactName || ''}
                  onChange={e => onChange('contactName', e.target.value)}
                  placeholder="Jane Smith"
                  className="w-full rounded-lg border border-[#1a2d48]/80 bg-[#121c2e] px-3.5 py-2.5 text-sm text-slate-200 placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500/40 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1.5" htmlFor="company-name">
                  Company / Organisation
                </label>
                <div className="relative">
                  <Building2 size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" />
                  <input
                    id="company-name"
                    type="text"
                    value={formData.companyName || ''}
                    onChange={e => onChange('companyName', e.target.value)}
                    placeholder="Acme Corp"
                    className="w-full rounded-lg border border-[#1a2d48]/80 bg-[#121c2e] pl-9 pr-3.5 py-2.5 text-sm text-slate-200 placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500/40 transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Advisory notice */}
          <div className="flex gap-3 rounded-xl border border-[#1a2d48]/60 bg-[#0d1421]/60 p-4">
            <ShieldCheck size={14} className="text-slate-600 shrink-0 mt-0.5" />
            <p className="text-xs text-slate-600 leading-relaxed">
              Your blueprint is generated server-side from your inputs using structured recommendation logic. No personal data is stored. Output is preliminary and advisory — not a formal proposal or price quote.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
