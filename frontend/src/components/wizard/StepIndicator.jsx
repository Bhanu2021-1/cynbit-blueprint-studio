import React from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

export default function StepIndicator({ currentStep, steps }) {
  return (
    <div className="flex items-center justify-between w-full" role="list" aria-label="Progress">
      {steps.map((label, i) => {
        const stepNum = i + 1
        const isCompleted = stepNum < currentStep
        const isCurrent = stepNum === currentStep

        return (
          <React.Fragment key={stepNum}>
            <div
              className="flex flex-col items-center gap-2 shrink-0"
              role="listitem"
              aria-current={isCurrent ? 'step' : undefined}
            >
              {/* Circle */}
              <motion.div
                animate={{
                  backgroundColor: isCompleted
                    ? 'rgba(6,182,212,1)'
                    : isCurrent
                      ? 'rgba(6,182,212,0.12)'
                      : 'rgba(13,20,33,1)',
                  borderColor: isCompleted
                    ? 'rgba(6,182,212,1)'
                    : isCurrent
                      ? 'rgba(6,182,212,0.7)'
                      : 'rgba(26,45,72,0.8)',
                  boxShadow: isCurrent
                    ? '0 0 16px rgba(6,182,212,0.25)'
                    : 'none',
                }}
                transition={{ duration: 0.3 }}
                className="h-8 w-8 rounded-full border-2 flex items-center justify-center"
              >
                {isCompleted ? (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <Check size={13} className="text-[#060b16]" strokeWidth={3} />
                  </motion.span>
                ) : (
                  <span className={`text-xs font-bold ${isCurrent ? 'text-cyan-400' : 'text-slate-600'}`}>
                    {stepNum}
                  </span>
                )}
              </motion.div>

              {/* Label */}
              <span className={`hidden sm:block text-[10px] font-semibold tracking-wider uppercase transition-colors duration-200 ${
                isCurrent ? 'text-cyan-400' : isCompleted ? 'text-slate-400' : 'text-slate-700'
              }`}>
                {label}
              </span>
            </div>

            {/* Connector */}
            {i < steps.length - 1 && (
              <div className="relative flex-1 mx-2 sm:mx-3 h-px -translate-y-3 sm:-translate-y-3">
                <div className="absolute inset-0 rounded-full bg-[#1a2d48]/80" />
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/70 to-cyan-500/30"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: stepNum < currentStep ? 1 : 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  style={{ transformOrigin: 'left' }}
                />
              </div>
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}
