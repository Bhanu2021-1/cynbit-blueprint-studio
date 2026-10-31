import React from 'react'

/**
 * Reusable Button component for the Cynbit Blueprint Studio design system.
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  iconRight,
  className = '',
  onClick,
  type = 'button',
  ...props
}) {
  const base = [
    'inline-flex items-center justify-center gap-2',
    'font-semibold rounded-xl transition-all duration-200 select-none',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400 focus-visible:outline-offset-2',
    'disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none',
  ].join(' ')

  const variants = {
    primary: [
      'bg-cyan-400 text-[#060b16] hover:bg-cyan-300 active:bg-cyan-500',
      'shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_28px_rgba(6,182,212,0.45)]',
    ].join(' '),
    secondary: [
      'bg-[#121c2e] border border-[#1a2d48]/80 text-slate-200',
      'hover:border-[#2a4268] hover:bg-[#18243b] hover:text-white',
      'active:border-cyan-500/50',
    ].join(' '),
    ghost: [
      'bg-transparent text-slate-400 hover:text-white hover:bg-white/[0.04]',
      'active:bg-white/[0.08]',
    ].join(' '),
    danger: [
      'bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 active:bg-red-500/30',
    ].join(' '),
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2.5 text-xs',
    lg: 'px-6 py-3 text-sm',
    xl: 'px-8 py-3.5 text-base',
  }

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={[base, variants[variant], sizes[size], className].join(' ')}
      {...props}
    >
      {loading ? (
        <svg
          className="animate-spin h-3.5 w-3.5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : icon ? (
        <span className="shrink-0">{icon}</span>
      ) : null}
      {children}
      {iconRight && !loading && <span className="shrink-0">{iconRight}</span>}
    </button>
  )
}
