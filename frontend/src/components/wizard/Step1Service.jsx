import React from 'react'
import { motion } from 'framer-motion'
import { Bot, Code2, Cloud, BarChart3, Check } from 'lucide-react'

const SERVICES = [
  {
    id: 'AI_AUTOMATION',
    icon: Bot,
    label: 'AI Automation',
    subtitle: 'Autonomous Agents & Intelligent Workflows',
    description: 'Intelligent automation pipelines, AI agents, NLP-driven workflows and autonomous decision-making systems that eliminate manual bottlenecks.',
    highlights: ['Workflow Orchestration', 'AI Agent Framework', 'CRM / ERP Integration'],
    colorClass: 'cyan',
  },
  {
    id: 'SOFTWARE_DEVELOPMENT',
    icon: Code2,
    label: 'Software Development',
    subtitle: 'Full-Stack Web & Mobile Applications',
    description: 'Custom web applications, enterprise dashboards, REST APIs and product engineering from concept to production deployment.',
    highlights: ['Java Spring Boot + React', 'REST APIs & Auth', 'Admin Dashboards'],
    colorClass: 'violet',
  },
  {
    id: 'CLOUD_INFRASTRUCTURE',
    icon: Cloud,
    label: 'Cloud Infrastructure',
    subtitle: 'Architecture, Migration & DevOps',
    description: 'Scalable cloud deployments on AWS, Azure or GCP with IaC, CI/CD pipelines, Kubernetes orchestration and security hardening.',
    highlights: ['Terraform IaC', 'Kubernetes & ECS', 'Observability Stack'],
    colorClass: 'cyan',
  },
  {
    id: 'DIGITAL_MARKETING',
    icon: BarChart3,
    label: 'Digital Marketing & SEO',
    subtitle: 'Technical SEO & Digital Growth',
    description: 'Technical SEO audits, Core Web Vitals optimisation, content architecture and performance marketing campaigns that drive measurable growth.',
    highlights: ['Technical SEO Audit', 'Content Architecture', 'GA4 & Analytics'],
    colorClass: 'violet',
  },
]

const colorTokens = {
  cyan: {
    iconBg: 'bg-cyan-500/[0.08] border-cyan-500/20',
    iconText: 'text-cyan-400',
    selectedBorder: 'border-cyan-500/50',
    selectedBg: 'bg-cyan-500/[0.05]',
    selectedGlow: '0 0 28px rgba(6,182,212,0.12)',
    dot: 'bg-cyan-400',
    checkBg: 'bg-cyan-400',
    highlight: 'text-cyan-500',
    dotInactive: 'bg-cyan-500/30',
  },
  violet: {
    iconBg: 'bg-violet-500/[0.08] border-violet-500/20',
    iconText: 'text-violet-400',
    selectedBorder: 'border-violet-500/50',
    selectedBg: 'bg-violet-500/[0.05]',
    selectedGlow: '0 0 28px rgba(129,140,248,0.12)',
    dot: 'bg-violet-400',
    checkBg: 'bg-violet-400',
    highlight: 'text-violet-400',
    dotInactive: 'bg-violet-500/30',
  },
}

export default function Step1Service({ value, onChange, errors }) {
  return (
    <div>
      <div className="mb-7">
        <h2 className="text-xl sm:text-2xl font-semibold text-white mb-1.5 tracking-tight">
          What service are you looking for?
        </h2>
        <p className="text-sm text-slate-400">
          Select the primary area that best matches your project.
        </p>
        {errors?.serviceType && (
          <p className="mt-3 inline-flex items-center gap-1.5 text-sm text-red-400 bg-red-400/[0.07] border border-red-400/20 px-3 py-1.5 rounded-lg">
            <span className="h-1.5 w-1.5 rounded-full bg-red-400 shrink-0" />
            {errors.serviceType}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {SERVICES.map((svc, i) => {
          const Icon = svc.icon
          const isSelected = value === svc.id
          const t = colorTokens[svc.colorClass]

          return (
            <motion.button
              key={svc.id}
              type="button"
              onClick={() => onChange(svc.id)}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              aria-pressed={isSelected}
              className={[
                'group relative text-left rounded-xl border p-5 transition-all duration-200 overflow-hidden',
                'focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400 focus-visible:outline-offset-2',
                isSelected
                  ? `${t.selectedBorder} ${t.selectedBg}`
                  : 'border-[#1a2d48]/80 bg-[#0d1421] hover:border-[#2a4268] hover:bg-[#121c2e]',
              ].join(' ')}
              style={isSelected ? { boxShadow: t.selectedGlow } : undefined}
            >
              {/* Selection checkmark */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: isSelected ? 1 : 0, opacity: isSelected ? 1 : 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                className={`absolute top-3.5 right-3.5 flex h-5 w-5 items-center justify-center rounded-full ${t.checkBg}`}
              >
                <Check size={11} className="text-[#060b16]" strokeWidth={3} />
              </motion.div>

              {/* Icon */}
              <div className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border ${t.iconBg} ${t.iconText} group-hover:border-opacity-40 transition-colors`}>
                <Icon size={20} strokeWidth={1.6} />
              </div>

              <p className="mb-0.5 text-[15px] font-semibold text-white leading-snug">{svc.label}</p>
              <p className={`mb-3 text-[11px] font-medium ${t.highlight}`}>{svc.subtitle}</p>
              <p className="mb-4 text-[13px] text-slate-400 leading-relaxed">{svc.description}</p>

              <ul className="space-y-1.5">
                {svc.highlights.map(h => (
                  <li key={h} className="flex items-center gap-2 text-xs text-slate-500">
                    <span className={`h-[5px] w-[5px] rounded-full shrink-0 ${isSelected ? t.dot : 'bg-[#1a2d48]'} transition-colors`} />
                    {h}
                  </li>
                ))}
              </ul>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
