import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Clock, ArrowRight } from 'lucide-react'

const EXAMPLE = {
  id: 'BPR-A4C9F1',
  title: 'Acme Retail: Autonomous AI Workflow Platform',
  service: 'AI Automation & Agents',
  complexity: 'Mid-Scale',
  timeline: '12–20 weeks',
  summary:
    'Mid-scale AI automation engagement focused on intelligent order-processing workflows, anomaly detection and a real-time operations dashboard. Phase 1 MVP delivers automated inventory monitoring and email-routing agents.',
  features: [
    { name: 'Workflow Orchestration Engine', priority: 'HIGH' },
    { name: 'AI Agent Framework', priority: 'HIGH' },
    { name: 'CRM + ERP Integration Hub', priority: 'HIGH' },
    { name: 'Anomaly & Exception Handling', priority: 'HIGH' },
    { name: 'Real-Time Ops Dashboard', priority: 'MEDIUM' },
  ],
  stack: [
    { layer: 'Orchestration', tech: 'Java 17 · Spring Boot 3 · Kafka' },
    { layer: 'Agent Layer', tech: 'LangChain4j · Drools' },
    { layer: 'Storage', tech: 'PostgreSQL 16 · Redis' },
    { layer: 'Frontend', tech: 'React 18 · Vite · Tailwind' },
  ],
  phases: [
    { n: 1, name: 'Discovery & Architecture', dur: '3–5 wks', color: 'bg-cyan-400' },
    { n: 2, name: 'Core Platform Build', dur: '8–12 wks', color: 'bg-indigo-400' },
    { n: 3, name: 'Intelligence Layer', dur: '5–7 wks', color: 'bg-violet-400' },
  ],
}

export default function ProductPreview() {
  return (
    <section id="preview" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[900px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(99,102,241,0.07) 0%, transparent 65%)', filter: 'blur(80px)' }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <p className="overline mb-3">Example Output</p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-4 tracking-tight">
            What your blueprint looks like
          </h2>
          <p className="mx-auto max-w-md text-[15px] text-slate-400">
            Every blueprint is generated from your specific inputs — no generic
            templates, no placeholder content.
          </p>
        </motion.div>

        {/* App shell */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="rounded-2xl overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.6),0_0_0_1px_rgba(26,45,72,0.8)]">
            {/* ── Title bar ── */}
            <div className="flex items-center gap-3 px-5 py-3 bg-[#0d1421] border-b border-[#1a2d48]/80">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-500/50" />
                <div className="h-3 w-3 rounded-full bg-yellow-400/50" />
                <div className="h-3 w-3 rounded-full bg-green-500/50" />
              </div>
              <div className="flex-1 flex items-center justify-center gap-2">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#121c2e] border border-[#1a2d48]/60">
                  <span className="text-[10px] font-mono text-slate-500 tracking-wide">blueprint-studio.cynbit.in</span>
                  <span className="text-[9px] font-mono text-cyan-600/70">/ {EXAMPLE.id}</span>
                </div>
              </div>
              <div className="flex gap-1.5">
                <div className="h-2 w-2 rounded-full bg-cyan-500/30" />
              </div>
            </div>

            {/* ── App body ── */}
            <div className="bg-[#0d1421] p-5 sm:p-7">
              {/* Document header strip */}
              <div className="flex flex-wrap items-start justify-between gap-4 mb-6 pb-5 border-b border-[#1a2d48]/60">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold tracking-wider uppercase text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 px-2.5 py-0.5 rounded-full">
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                      {EXAMPLE.service}
                    </span>
                    <span className="text-[10px] text-slate-500 bg-[#121c2e] border border-[#1a2d48]/70 px-2.5 py-0.5 rounded-full">
                      {EXAMPLE.complexity}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-white mb-1 leading-snug">{EXAMPLE.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed max-w-xl">{EXAMPLE.summary}</p>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500 shrink-0">
                  <Clock size={11} />
                  <span>{EXAMPLE.timeline}</span>
                </div>
              </div>

              {/* Content grid */}
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
                {/* Features — 3 cols */}
                <div className="lg:col-span-3 space-y-3">
                  <p className="overline text-[10px] text-slate-500 mb-3">MVP Features</p>
                  <div className="space-y-1.5">
                    {EXAMPLE.features.map(f => (
                      <div
                        key={f.name}
                        className="group flex items-center justify-between rounded-lg bg-[#121c2e] border border-[#1a2d48]/70 px-3.5 py-2.5 hover:border-cyan-500/20 transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <CheckCircle2 size={13} className="text-cyan-500/70 shrink-0" />
                          <span className="text-sm text-slate-200 font-medium">{f.name}</span>
                        </div>
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded tracking-wider shrink-0 priority-${f.priority}`}>
                          {f.priority}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stack + Roadmap — 2 cols */}
                <div className="lg:col-span-2 space-y-5">
                  {/* Stack */}
                  <div>
                    <p className="overline text-[10px] text-slate-500 mb-3">Stack</p>
                    <div className="space-y-1.5">
                      {EXAMPLE.stack.map(s => (
                        <div key={s.layer} className="rounded-lg bg-[#121c2e] border border-[#1a2d48]/70 px-3.5 py-2.5">
                          <p className="text-[9px] text-slate-600 uppercase tracking-widest mb-1">{s.layer}</p>
                          <p className="font-mono text-[11px] text-cyan-400/90 leading-none">{s.tech}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Roadmap */}
                  <div>
                    <p className="overline text-[10px] text-slate-500 mb-3">Roadmap</p>
                    <div className="space-y-2">
                      {EXAMPLE.phases.map((ph, i) => (
                        <div key={ph.n} className="flex items-center gap-3">
                          <div className={`h-5 w-5 rounded-full flex items-center justify-center text-[9px] font-bold text-[#060b16] shrink-0 ${ph.color}`}>
                            {ph.n}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <p className="text-xs font-medium text-slate-300 truncate">{ph.name}</p>
                              <p className="text-[10px] text-slate-600 whitespace-nowrap">{ph.dur}</p>
                            </div>
                            {i < EXAMPLE.phases.length - 1 && (
                              <div className="mt-2 ml-[-26px] h-3 flex items-start pl-[8px]">
                                <div className="w-px h-full bg-[#1a2d48]/80" />
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer action bar */}
              <div className="mt-6 pt-5 border-t border-[#1a2d48]/60 flex flex-wrap items-center justify-between gap-3">
                <p className="text-[11px] text-slate-600 italic">
                  Advisory only — not a formal proposal or price quote
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Copy Summary', 'Export PDF', 'Email Cynbit'].map(a => (
                    <span key={a} className="text-[11px] px-3 py-1.5 rounded-lg border border-[#1a2d48]/70 bg-[#121c2e] text-slate-500">
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA below preview */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 text-center"
        >
          <button
            onClick={() => document.querySelector('#wizard')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            className="inline-flex items-center gap-2 text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors group"
          >
            Generate your own blueprint
            <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}
