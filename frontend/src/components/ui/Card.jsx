import React from 'react'

/**
 * Reusable surface card with optional interactive (hover/selected) states.
 */
export default function Card({
  children,
  className = '',
  interactive = false,
  selected = false,
  onClick,
  as: Tag = 'div',
  ...props
}) {
  const base = 'rounded-2xl border border-[#1a2d48]/80 bg-[#0d1421] transition-all duration-200'
  const interactiveStyles = interactive
    ? 'cursor-pointer hover:border-[#2a4268] hover:bg-[#121c2e] active:scale-[0.99]'
    : ''
  const selectedStyles = selected
    ? 'border-cyan-500/50 bg-cyan-500/[0.05] shadow-[0_0_24px_rgba(6,182,212,0.12)]'
    : ''

  return (
    <Tag
      onClick={onClick}
      className={[base, interactiveStyles, selectedStyles, className].join(' ')}
      {...(interactive
        ? {
            role: 'button',
            tabIndex: 0,
            onKeyDown: (e) => (e.key === 'Enter' || e.key === ' ') && onClick?.(),
          }
        : {})}
      {...props}
    >
      {children}
    </Tag>
  )
}
