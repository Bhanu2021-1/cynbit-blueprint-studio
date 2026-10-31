import React from 'react'
import { motion } from 'framer-motion'
import { ClipboardList, Cpu, FileSpreadsheet } from 'lucide-react'

const STEPS = [
  {
    n: '01',
    icon: ClipboardList,
    title: 'Describe your project',
    body: 'Select your service area, describe your business goals, choose the capabilities you need and set your project complexity — four focused steps, no open-ended forms.',
  },
  {
    n: '02',
    icon: Cpu,
    title: 'Java backend processes it',
    body: 'Your inputs are validated and sent to a Spring Boot REST API that applies structured recommendation logic — deterministic, explainable, zero external AI calls.',
  },
  {
    n: '03',
    icon: FileSpreadsheet,
    title: 'Receive your blueprint',
    body: 'Get a tailored preliminary blueprint: suggested MVP features, a technology stack with rationale, a phased roadmap, key assumptions and actionable next steps.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24 sm:py-32">
      {/* Subtle top divider */}
      <div className="section-divider mb-0" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <p className="overline mb-3">Process</p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight mb-3">
            How it works
          </h2>
          <p className="mx-auto max-w-sm text-[15px] text-slate-400">
            From idea to structured blueprint in under five minutes.
          </p>
        </motion.div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5 relative">
          {/* Connecting dashes — desktop only */}
          <div
            className="hidden md:block absolute top-[46px] left-[calc(33.33%+32px)] right-[calc(33.33%+32px)] h-px"
            style={{
              background: 'linear-gradient(90deg, rgba(6,182,212,0.35) 0%, rgba(129,140,248,0.25) 50%, rgba(6,182,212,0.35) 100%)',
            }}
            aria-hidden="true"
          />

          {STEPS.map((step, i) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="relative h-full rounded-2xl border border-[#1a2d48]/80 bg-[#0d1421] p-7 overflow-hidden group hover:border-[#2a4268] transition-colors duration-300">
                  {/* Subtle corner glow on hover */}
                  <div className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full bg-cyan-500/[0.04] group-hover:bg-cyan-500/[0.08] transition-colors duration-500 blur-2xl" />

                  {/* Number + icon row */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-500/[0.07] group-hover:border-cyan-500/35 group-hover:bg-cyan-500/[0.1] transition-all duration-300">
                      <Icon size={22} className="text-cyan-400" strokeWidth={1.5} />
                    </div>
                    <span
                      className="text-5xl font-bold select-none leading-none"
                      style={{ color: 'rgba(26,45,72,0.7)', WebkitTextStrokeWidth: '1px', WebkitTextStrokeColor: 'rgba(26,45,72,0.9)' }}
                    >
                      {step.n}
                    </span>
                  </div>

                  <h3 className="mb-2.5 text-base font-semibold text-white leading-snug">{step.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{step.body}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
