import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ExternalLink, Zap, FileSpreadsheet } from 'lucide-react'

export default function Navigation({ hasResult = false, onStartClick }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 32)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const navLinks = [
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Preview', href: '#preview' },
    { label: hasResult ? 'Blueprint Deliverable' : 'Start Discovery', href: hasResult ? '#result' : '#wizard' },
  ]

  const handleScroll = (e, href) => {
    e.preventDefault()
    setMobileOpen(false)
    if (href === '#wizard' && hasResult && onStartClick) {
      onStartClick()
      return
    }
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else if (hasResult && onStartClick) {
      onStartClick()
    }
  }

  return (
    <header
      className={[
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-[#060b16]/90 backdrop-blur-2xl border-b border-[#1a2d48]/60 shadow-[0_1px_0_0_rgba(6,182,212,0.04)]'
          : 'bg-transparent',
      ].join(' ')}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[60px]">

          {/* ── Logotype ── */}
          <a
            href="https://cynbit.in"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 group rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#060b16]"
            aria-label="Cynbit Technologies — open website"
          >
            {/* Geometric mark */}
            <div className="relative w-8 h-8 shrink-0">
              <div className="absolute inset-0 rounded-[9px] bg-gradient-to-br from-cyan-500/20 to-indigo-600/10 border border-cyan-500/25 group-hover:border-cyan-400/50 transition-colors duration-300" />
              <div className="absolute inset-0 rounded-[9px] group-hover:bg-cyan-500/5 transition-colors duration-300" />
              <svg viewBox="0 0 20 20" fill="none" className="absolute inset-0 w-full h-full p-[5px]" aria-hidden="true">
                <polygon points="10,2 18,6.5 18,13.5 10,18 2,13.5 2,6.5" stroke="#06b6d4" strokeWidth="1.25" fill="rgba(6,182,212,0.06)" strokeLinejoin="round" />
                <line x1="10" y1="2" x2="10" y2="18" stroke="#06b6d4" strokeWidth="0.75" strokeOpacity="0.4" />
                <line x1="2" y1="6.5" x2="18" y2="13.5" stroke="#06b6d4" strokeWidth="0.75" strokeOpacity="0.4" />
                <line x1="18" y1="6.5" x2="2" y2="13.5" stroke="#06b6d4" strokeWidth="0.75" strokeOpacity="0.4" />
              </svg>
            </div>

            <div className="flex flex-col leading-none gap-0.5">
              <span className="text-[13px] font-semibold tracking-tight text-white group-hover:text-cyan-300 transition-colors duration-200">
                Cynbit
              </span>
              <span className="text-[9.5px] font-medium tracking-[0.15em] uppercase text-slate-500 group-hover:text-slate-400 transition-colors duration-200">
                Blueprint Studio
              </span>
            </div>
          </a>

          {/* ── Desktop nav ── */}
          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleScroll(e, link.href)}
                className="relative px-4 py-2 text-[13px] font-medium text-slate-400 hover:text-white rounded-lg hover:bg-white/[0.04] transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 group"
              >
                {link.label}
              </a>
            ))}

            <div className="mx-3 h-4 w-px bg-[#1a2d48]" />

            <a
              href="https://cynbit.in"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 text-[13px] text-slate-500 hover:text-slate-300 transition-colors duration-150 rounded-lg hover:bg-white/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              cynbit.in
              <ExternalLink size={11} className="opacity-60" />
            </a>

            <a
              href={hasResult ? '#result' : '#wizard'}
              onClick={(e) => handleScroll(e, hasResult ? '#result' : '#wizard')}
              className="ml-2 flex items-center gap-1.5 px-4 py-[7px] text-[13px] font-semibold text-[#060b16] bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-all duration-200 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_28px_rgba(6,182,212,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#060b16]"
            >
              {hasResult ? <FileSpreadsheet size={13} /> : <Zap size={13} />}
              {hasResult ? 'View Blueprint' : 'Build Blueprint'}
            </a>
          </div>

          {/* ── Mobile toggle ── */}
          <button
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            onClick={() => setMobileOpen(o => !o)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen
                ? <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}><X size={19} /></motion.span>
                : <motion.span key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}><Menu size={19} /></motion.span>
              }
            </AnimatePresence>
          </button>
        </div>
      </nav>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden border-t border-[#1a2d48]/60 bg-[#060b16]/95 backdrop-blur-2xl overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-0.5">
              {navLinks.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleScroll(e, link.href)}
                  className="px-4 py-3 text-sm text-slate-400 hover:text-white rounded-lg hover:bg-white/[0.04] transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="my-2 h-px bg-[#1a2d48]/60" />
              <a
                href={hasResult ? '#result' : '#wizard'}
                onClick={(e) => handleScroll(e, hasResult ? '#result' : '#wizard')}
                className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-[#060b16] bg-cyan-400 rounded-lg shadow-[0_0_20px_rgba(6,182,212,0.25)]"
              >
                {hasResult ? <FileSpreadsheet size={14} /> : <Zap size={14} />}
                {hasResult ? 'View Blueprint' : 'Build Blueprint'}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
