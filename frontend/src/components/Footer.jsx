import React from 'react'
import { ExternalLink, Mail, MapPin, Shield } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative border-t border-[#1a2d48]/80 bg-[#060b16] mt-20 print:hidden" aria-label="Site Footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">

          {/* Col 1: Brand & Concept */}
          <div className="md:col-span-2 space-y-3.5">
            <div className="flex items-center gap-2.5">
              <div className="relative w-7 h-7 flex items-center justify-center rounded-lg bg-cyan-500/[0.08] border border-cyan-500/25">
                <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4" aria-hidden="true">
                  <polygon points="10,2 18,6.5 18,13.5 10,18 2,13.5 2,6.5" stroke="#06b6d4" strokeWidth="1.25" fill="rgba(6,182,212,0.06)" strokeLinejoin="round" />
                  <line x1="10" y1="2" x2="10" y2="18" stroke="#06b6d4" strokeWidth="0.75" strokeOpacity="0.4" />
                </svg>
              </div>
              <div>
                <span className="text-sm font-semibold text-white tracking-tight">Cynbit Blueprint Studio</span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              An interactive project discovery and deterministic blueprint generator designed
              as a high-value pre-sales enhancement for Cynbit Technologies.
              Replaces open-ended inquiries with structured preliminary project architecture.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={12} className="text-cyan-500/70" />
                Jaipur, Rajasthan, India
              </span>
              <a
                href="mailto:opportunities@cynbit.in"
                className="inline-flex items-center gap-1.5 hover:text-cyan-400 transition-colors"
              >
                <Mail size={12} className="text-cyan-500/70" />
                opportunities@cynbit.in
              </a>
            </div>
          </div>

          {/* Col 2: Official Cynbit Links */}
          <div className="space-y-3">
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest">
              Cynbit Technologies
            </p>
            <ul className="space-y-2">
              {[
                { label: 'Official Website', href: 'https://cynbit.in' },
                { label: 'AI Automation & Agents', href: 'https://cynbit.in/#services' },
                { label: 'Software Engineering', href: 'https://cynbit.in/#services' },
                { label: 'Cloud Architecture', href: 'https://cynbit.in/#services' },
              ].map(link => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-cyan-400 transition-colors"
                  >
                    {link.label}
                    <ExternalLink size={10} className="opacity-50" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Engineering Stack */}
          <div className="space-y-3">
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest">
              Assessment Stack
            </p>
            <div className="flex flex-wrap gap-1.5">
              {[
                'React 18',
                'Java 17',
                'Spring Boot 3.3',
                'Vite 5',
                'Tailwind CSS',
                'Framer Motion',
                'Jakarta Validation',
                'JUnit 5',
              ].map(tech => (
                <span
                  key={tech}
                  className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-[#121c2e] border border-[#1a2d48]/70 text-slate-400"
                >
                  {tech}
                </span>
              ))}
            </div>
            <p className="text-[11px] text-slate-600 leading-normal pt-1">
              Monorepo architecture with clean separation of presentation and deterministic service logic.
            </p>
          </div>

        </div>

        {/* Bottom copyright & disclaimer */}
        <div className="pt-8 border-t border-[#1a2d48]/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>
            © 2024 Cynbit Technologies Private Limited · <span className="text-slate-400 italic">&ldquo;Engineered for Optimism&rdquo;</span>
          </p>

          <div className="flex items-center gap-2 text-[11px] text-slate-600">
            <Shield size={12} className="text-slate-600" />
            <span>Full-Stack Developer Intern Technical Assessment Prototype</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
