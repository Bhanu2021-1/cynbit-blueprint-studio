import React from 'react'
import { motion } from 'framer-motion'
import {
  CheckCircle2,
  Layers,
  GitBranch,
  AlertCircle,
  ArrowRight,
  FileText,
  Clock,
  IndianRupee,
  ShieldCheck,
  Check,
  Building2,
} from 'lucide-react'
import ResultActions from './ResultActions'

const easeOut = [0.22, 1, 0.36, 1]

const fadeUp = (delay = 0, y = 16) => ({
  initial: { opacity: 0, y },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: easeOut },
})

function SectionHeader({ icon: Icon, title, subtitle }) {
  return (
    <div className="flex items-start gap-3 mb-6">
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-cyan-500/20 bg-cyan-500/[0.08]">
        <Icon size={16} className="text-cyan-400" strokeWidth={1.75} />
      </div>
      <div>
        <h3 className="text-base font-semibold text-white tracking-tight leading-snug">{title}</h3>
        {subtitle && <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{subtitle}</p>}
      </div>
    </div>
  )
}

export default function BlueprintResult({ blueprint, formData, onEdit }) {
  if (!blueprint) return null

  const generatedDate = blueprint.generatedAt
    ? new Date(blueprint.generatedAt).toLocaleString('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short',
      })
    : new Date().toLocaleDateString('en-IN')

  return (
    <section id="result" className="relative py-16 sm:py-24 scroll-mt-16 print:py-4">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute inset-0 print:hidden" aria-hidden="true">
        <div
          className="absolute top-10 left-1/2 -translate-x-1/2 h-[550px] w-[950px] rounded-full"
          style={{
            background: 'radial-gradient(ellipse, rgba(6,182,212,0.07) 0%, rgba(99,102,241,0.04) 40%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6">

        {/* ── Document Header ── */}
        <motion.div {...fadeUp(0)} className="mb-10">
          {/* Status banner strip */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-4 border-b border-[#1a2d48]/80">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/[0.1] border border-emerald-500/25 text-xs font-semibold text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Advisory Blueprint Ready
              </span>
              <span className="text-xs font-mono text-cyan-400/90 bg-[#121c2e] border border-[#1a2d48]/80 px-2.5 py-0.5 rounded-md">
                {blueprint.blueprintId}
              </span>
              <span className="text-xs text-slate-500">·</span>
              <span className="text-xs text-slate-500 tabular-nums">{generatedDate}</span>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-slate-500 uppercase tracking-widest font-mono">
              <span>Cynbit Technologies</span>
              <span>/</span>
              <span>Jaipur, India</span>
            </div>
          </div>

          {/* Title & Metadata */}
          <div className="mb-6">
            <p className="overline mb-1.5">Preliminary Deliverable</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white tracking-tight mb-3 leading-tight">
              {blueprint.projectTitle}
            </h2>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs px-3 py-1 rounded-full border border-cyan-500/25 bg-cyan-500/[0.08] text-cyan-300 font-medium">
                {blueprint.serviceCategory}
              </span>
              <span className="text-xs px-3 py-1 rounded-full border border-[#1a2d48]/80 bg-[#121c2e] text-slate-300 font-medium">
                Complexity: {blueprint.complexityLabel}
              </span>
              {formData?.companyName && (
                <span className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full border border-[#1a2d48]/80 bg-[#121c2e] text-slate-400 font-medium">
                  <Building2 size={12} className="text-slate-500" />
                  {formData.companyName}
                </span>
              )}
            </div>
          </div>

          {/* Top Actions */}
          <div className="pt-2">
            <ResultActions blueprint={blueprint} formData={formData} onEdit={onEdit} />
          </div>
        </motion.div>

        {/* ── Document Body ── */}
        <div className="space-y-6">

          {/* 1. Executive Summary Card */}
          <motion.div
            {...fadeUp(0.06)}
            className="rounded-2xl border border-[#1a2d48]/80 bg-[#0d1421] p-6 sm:p-8 shadow-[0_16px_40px_rgba(0,0,0,0.4)]"
          >
            <SectionHeader
              icon={FileText}
              title="Executive Summary"
              subtitle="Synthesized business requirements and strategic delivery rationale"
            />
            <p className="text-slate-300 leading-relaxed text-[14.5px] mb-6">
              {blueprint.executiveSummary}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-[#121c2e] border border-[#1a2d48]/70">
                <Clock size={16} className="text-cyan-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    Indicative Timeline
                  </p>
                  <p className="text-sm font-semibold text-white">
                    {blueprint.indicativeTimelineRange}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-[#121c2e] border border-[#1a2d48]/70">
                <IndianRupee size={16} className="text-cyan-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    Indicative Budget Guidance
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {blueprint.indicativeBudgetNote}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 2. Suggested MVP Features */}
          <motion.div
            {...fadeUp(0.12)}
            className="rounded-2xl border border-[#1a2d48]/80 bg-[#0d1421] p-6 sm:p-8 shadow-[0_16px_40px_rgba(0,0,0,0.4)]"
          >
            <SectionHeader
              icon={CheckCircle2}
              title="Suggested MVP Features"
              subtitle="Core functional scope prioritized to deliver immediate business impact in Phase 1"
            />

            <div className="space-y-6">
              {blueprint.mvpFeatures?.map((group) => (
                <div key={group.category} className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      {group.category}
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 gap-2.5">
                    {group.features?.map((feature) => (
                      <div
                        key={feature.name}
                        className="flex items-start justify-between gap-4 p-4 rounded-xl bg-[#121c2e] border border-[#1a2d48]/70 hover:border-[#2a4268] transition-colors"
                      >
                        <div className="flex items-start gap-3 min-w-0">
                          <div className="h-5 w-5 rounded-md bg-cyan-500/[0.1] border border-cyan-500/20 flex items-center justify-center shrink-0 mt-0.5">
                            <Check size={12} className="text-cyan-400" strokeWidth={2.5} />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-white leading-snug">
                              {feature.name}
                            </p>
                            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                              {feature.description}
                            </p>
                          </div>
                        </div>

                        <span className={`shrink-0 text-[9px] font-bold px-2 py-0.5 rounded tracking-wider uppercase priority-${feature.priority}`}>
                          {feature.priority}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* 3. Recommended Technology Stack */}
          <motion.div
            {...fadeUp(0.18)}
            className="rounded-2xl border border-[#1a2d48]/80 bg-[#0d1421] p-6 sm:p-8 shadow-[0_16px_40px_rgba(0,0,0,0.4)]"
          >
            <SectionHeader
              icon={Layers}
              title="Recommended Technology Stack"
              subtitle="Target digital architecture engineered for scalability, resilience, and developer velocity"
            />

            <div className="space-y-3 mb-6">
              {blueprint.recommendedStack?.layers?.map((layer) => (
                <div
                  key={layer.layer}
                  className="p-4 rounded-xl bg-[#121c2e] border border-[#1a2d48]/70"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-semibold text-white uppercase tracking-wider">
                      {layer.layer}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {layer.technologies?.map((tech) => (
                        <span key={tech} className="tech-badge">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed italic">
                    {layer.rationale}
                  </p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="p-4 rounded-xl bg-[#121c2e] border border-[#1a2d48]/70">
                <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-2.5">
                  Cloud & Infrastructure
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {blueprint.recommendedStack?.cloudProviders?.map((cloud) => (
                    <span
                      key={cloud}
                      className="text-xs px-2.5 py-1 rounded-md bg-indigo-500/[0.1] border border-indigo-500/25 text-indigo-300 font-medium"
                    >
                      {cloud}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#121c2e] border border-[#1a2d48]/70">
                <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-2.5">
                  DevOps, CI/CD & Tooling
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {blueprint.recommendedStack?.devOpsTools?.map((tool) => (
                    <span
                      key={tool}
                      className="text-xs px-2.5 py-1 rounded-md bg-[#1a2d48]/60 border border-[#1a2d48] text-slate-300 font-medium"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* 4. Staged Implementation Roadmap */}
          <motion.div
            {...fadeUp(0.24)}
            className="rounded-2xl border border-[#1a2d48]/80 bg-[#0d1421] p-6 sm:p-8 shadow-[0_16px_40px_rgba(0,0,0,0.4)]"
          >
            <SectionHeader
              icon={GitBranch}
              title="Staged Implementation Roadmap"
              subtitle="Iterative milestone delivery plan with verifiable deliverables per phase"
            />

            <div className="space-y-6">
              {blueprint.implementationRoadmap?.map((phase, i) => (
                <div key={phase.phaseNumber} className="flex gap-4">
                  {/* Timeline rail */}
                  <div className="flex flex-col items-center shrink-0">
                    <div className="h-8 w-8 rounded-full bg-cyan-500/[0.15] border-2 border-cyan-400 flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(6,182,212,0.3)]">
                      <span className="text-xs font-bold text-cyan-300">{phase.phaseNumber}</span>
                    </div>
                    {i < blueprint.implementationRoadmap.length - 1 && (
                      <div className="w-px flex-1 mt-2 bg-gradient-to-b from-cyan-400/40 via-[#1a2d48] to-[#1a2d48] min-h-[2.5rem]" />
                    )}
                  </div>

                  {/* Phase content */}
                  <div className="flex-1 min-w-0 pb-4">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                      <h4 className="text-sm font-semibold text-white tracking-tight">
                        {phase.phaseName}
                      </h4>
                      <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-[#121c2e] border border-[#1a2d48]/80 text-cyan-400">
                        {phase.estimatedDuration}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      {phase.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {phase.deliverables?.map((d) => (
                        <span
                          key={d}
                          className="inline-flex items-center gap-1.5 text-xs text-slate-300 bg-[#121c2e] px-2.5 py-1 rounded-lg border border-[#1a2d48]/70"
                        >
                          <CheckCircle2 size={11} className="text-cyan-400" />
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* 5. Key Assumptions & Next Steps */}
          <motion.div {...fadeUp(0.3)} className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Key Assumptions */}
            <div className="rounded-2xl border border-[#1a2d48]/80 bg-[#0d1421] p-6 sm:p-7 shadow-[0_16px_40px_rgba(0,0,0,0.4)]">
              <SectionHeader
                icon={ShieldCheck}
                title="Key Assumptions"
                subtitle="Baseline parameters governing this estimate"
              />
              <ul className="space-y-3">
                {blueprint.assumptions?.map((assumption, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                    <AlertCircle size={13} className="text-cyan-500/80 mt-0.5 shrink-0" />
                    <span>{assumption}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recommended Next Steps */}
            <div className="rounded-2xl border border-[#1a2d48]/80 bg-[#0d1421] p-6 sm:p-7 shadow-[0_16px_40px_rgba(0,0,0,0.4)]">
              <SectionHeader
                icon={ArrowRight}
                title="Recommended Next Steps"
                subtitle="How to advance from blueprint to execution"
              />
              <ol className="space-y-3.5">
                {blueprint.nextSteps?.map((ns) => (
                  <li key={ns.order} className="flex gap-3">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-cyan-500/[0.12] border border-cyan-500/30 text-[10px] font-bold text-cyan-300 shrink-0 mt-0.5">
                      {ns.order}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-white">{ns.action}</p>
                      <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{ns.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </motion.div>

          {/* 6. Advisory Disclaimer */}
          <motion.div {...fadeUp(0.34)}>
            <div className="flex items-start gap-3 p-4 rounded-xl border border-[#1a2d48]/80 bg-[#0d1421]/60">
              <ShieldCheck size={15} className="text-slate-500 shrink-0 mt-0.5" />
              <p className="text-xs text-slate-500 leading-relaxed italic">
                {blueprint.disclaimer}
              </p>
            </div>
          </motion.div>

          {/* 7. Bottom Action Toolbar */}
          <motion.div {...fadeUp(0.38)} className="pt-2 print:hidden">
            <div className="rounded-2xl border border-[#1a2d48]/80 bg-[#0d1421] p-5 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold text-white">Ready to proceed with this scope?</p>
                <p className="text-[11px] text-slate-500">
                  Send this structured inquiry directly to opportunities@cynbit.in or copy the summary.
                </p>
              </div>
              <ResultActions blueprint={blueprint} formData={formData} onEdit={onEdit} />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
