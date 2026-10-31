import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowDown } from 'lucide-react'

const easeOut = [0.22, 1, 0.36, 1]

const fadeUp = (delay = 0, y = 20) => ({
  initial: { opacity: 0, y },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: easeOut },
})

const TRUST_ITEMS = [
  'No sign-up required',
  'Deterministic logic — no AI black box',
  'Instant structured output',
  'Free to use',
]

export default function Hero() {
  const scrollToWizard = (e) => {
    e?.preventDefault()
    document.querySelector('#wizard')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden pt-[60px]"
      aria-label="Hero"
    >
      {/* ── Background layers ── */}

      {/* Fine grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64' width='64' height='64' fill='none' stroke='rgba(26,45,72,0.8)'%3e%3cpath d='M0 .5H63.5V64'/%3e%3c/svg%3e\")",
        }}
        aria-hidden="true"
      />

      {/* Top radial glow — cyan */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 55% at 50% -5%, rgba(6,182,212,0.13) 0%, transparent 65%)',
        }}
        aria-hidden="true"
      />

      {/* Mid ambient — violet */}
      <div
        className="pointer-events-none absolute top-[40%] left-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: 'radial-gradient(ellipse, rgba(99,102,241,0.07) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        aria-hidden="true"
      />

      {/* Bottom fade */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-40"
        style={{ background: 'linear-gradient(to top, #060b16 0%, transparent 100%)' }}
        aria-hidden="true"
      />

      {/* ── Main content ── */}
      <div className="relative z-10 mx-auto w-full max-w-5xl px-4 pb-16 text-center sm:px-6">

        {/* Eyebrow badge */}
        <motion.div {...fadeUp(0)} className="mb-8 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/25 bg-cyan-500/[0.07] px-4 py-1.5 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-[pulse_2.5s_ease-in-out_infinite]" />
            <span className="text-[11px] font-semibold tracking-[0.12em] text-cyan-400 uppercase">
              Cynbit Technologies — Blueprint Studio
            </span>
          </div>
        </motion.div>

        {/* Display headline — split for colour emphasis */}
        <motion.h1
          {...fadeUp(0.08, 28)}
          className="mb-5 text-[2.6rem] font-semibold leading-[1.06] tracking-tight sm:text-6xl lg:text-[5rem]"
        >
          <span className="block text-white">From business need</span>
          <span className="block" style={{
            background: 'linear-gradient(130deg, #22d3ee 0%, #818cf8 55%, #c084fc 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            to project blueprint.
          </span>
        </motion.h1>

        {/* Sub-copy — tight, specific, business-focused */}
        <motion.p
          {...fadeUp(0.16)}
          className="mx-auto mb-10 max-w-[540px] text-[1.0625rem] leading-relaxed text-slate-400 sm:text-lg"
        >
          Skip the vague inquiry. Answer four guided questions and receive a
          structured preliminary blueprint — features, stack, roadmap and next
          steps — tailored to your inputs.
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...fadeUp(0.22)}
          className="flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <button
            onClick={scrollToWizard}
            className="group relative flex items-center gap-2.5 overflow-hidden rounded-xl bg-cyan-400 px-7 py-3.5 text-sm font-semibold text-[#060b16] shadow-[0_0_24px_rgba(6,182,212,0.35)] transition-all duration-200 hover:bg-cyan-300 hover:shadow-[0_0_36px_rgba(6,182,212,0.5)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400 focus-visible:outline-offset-2"
          >
            {/* Shine sweep */}
            <span className="pointer-events-none absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-[120%] transition-transform duration-500" />
            Build Your Blueprint
            <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </button>

          <a
            href="#preview"
            onClick={(e) => { e.preventDefault(); document.querySelector('#preview')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="flex items-center gap-2 rounded-xl border border-[#1a2d48] px-7 py-3.5 text-sm font-medium text-slate-400 transition-all duration-200 hover:border-[#2a4268] hover:bg-white/[0.03] hover:text-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400 focus-visible:outline-offset-2"
          >
            See example output
          </a>
        </motion.div>

        {/* Trust row */}
        <motion.div
          {...fadeUp(0.3)}
          className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
        >
          {TRUST_ITEMS.map((item) => (
            <span key={item} className="flex items-center gap-1.5 text-[11.5px] text-slate-600">
              <span className="h-[3px] w-[3px] rounded-full bg-cyan-500/50" />
              {item}
            </span>
          ))}
        </motion.div>
      </div>

      {/* ── Scroll cue ── */}
      <motion.button
        onClick={scrollToWizard}
        aria-label="Scroll down"
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600 hover:text-slate-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="h-7 w-px bg-gradient-to-b from-transparent to-[#1a2d48]" />
        <ArrowDown size={13} />
      </motion.button>
    </section>
  )
}
