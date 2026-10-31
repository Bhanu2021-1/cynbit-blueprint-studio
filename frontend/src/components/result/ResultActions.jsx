import React, { useState } from 'react'
import { Copy, Check, Printer, Mail, Edit3 } from 'lucide-react'
import { copyBlueprintSummary, openEmailDraft, printBlueprint } from '../../utils/export'

export default function ResultActions({ blueprint, formData, onEdit }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await copyBlueprintSummary(blueprint)
      setCopied(true)
      setTimeout(() => setCopied(false), 2400)
    } catch {
      alert('Copy failed — please select the text manually.')
    }
  }

  const handleEmail = () => openEmailDraft(blueprint, formData)
  const handlePrint = () => printBlueprint(blueprint?.projectTitle)

  return (
    <div className="flex flex-wrap items-center gap-2.5 print:hidden" role="toolbar" aria-label="Blueprint Actions">
      {/* Primary: Email Cynbit */}
      <button
        type="button"
        onClick={handleEmail}
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-[#060b16] bg-cyan-400 hover:bg-cyan-300 transition-all duration-200 shadow-[0_0_20px_rgba(6,182,212,0.25)] hover:shadow-[0_0_28px_rgba(6,182,212,0.4)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400 focus-visible:outline-offset-2"
        title="Open pre-filled email draft to Cynbit engineering team"
      >
        <Mail size={14} />
        Email Cynbit Inquiry
      </button>

      {/* Secondary: Copy Summary */}
      <button
        type="button"
        onClick={handleCopy}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400 ${
          copied
            ? 'border-emerald-500/50 bg-emerald-500/[0.1] text-emerald-300 shadow-[0_0_16px_rgba(16,185,129,0.15)]'
            : 'border-[#1a2d48]/80 bg-[#121c2e] hover:border-[#2a4268] hover:bg-[#18243b] text-slate-300 hover:text-white'
        }`}
        title="Copy structured text summary to clipboard"
      >
        {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} className="text-slate-400" />}
        {copied ? 'Copied to Clipboard' : 'Copy Summary'}
      </button>

      {/* Secondary: Print / PDF */}
      <button
        type="button"
        onClick={handlePrint}
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold border border-[#1a2d48]/80 bg-[#121c2e] hover:border-[#2a4268] hover:bg-[#18243b] text-slate-300 hover:text-white transition-all duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400"
        title="Print or export as PDF via browser"
      >
        <Printer size={14} className="text-slate-400" />
        Export / Print PDF
      </button>

      {/* Tertiary: Edit Inputs */}
      <button
        type="button"
        onClick={onEdit}
        className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-white/[0.04] transition-all duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400 ml-auto"
        title="Return to discovery wizard to modify inputs"
      >
        <Edit3 size={13} />
        Edit Inputs
      </button>
    </div>
  )
}
