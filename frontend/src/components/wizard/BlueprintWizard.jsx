import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Sparkles, AlertCircle, RotateCcw } from 'lucide-react'

import StepIndicator from './StepIndicator'
import Step1Service from './Step1Service'
import Step2Goals from './Step2Goals'
import Step3Timeline from './Step3Timeline'
import Step4Review from './Step4Review'
import { generateBlueprint } from '../../api/blueprint'
import { saveDraft, loadDraft, clearDraft } from '../../utils/localStorage'

const STEP_LABELS = ['Service', 'Goals', 'Timeline', 'Review']
const TOTAL_STEPS = 4

const EMPTY_FORM = {
  serviceType: '',
  businessGoals: '',
  keyCapabilities: [],
  complexity: '',
  timeline: '',
  budgetRange: '',
  contactName: '',
  companyName: '',
}

function validate(formData, step) {
  const errors = {}
  if (step >= 1) {
    if (!formData.serviceType) errors.serviceType = 'Please select a service type to continue.'
  }
  if (step >= 2) {
    if (!formData.businessGoals || formData.businessGoals.trim().length < 10)
      errors.businessGoals = 'Please describe your goals (at least 10 characters).'
    if (formData.businessGoals && formData.businessGoals.length > 2000)
      errors.businessGoals = 'Please shorten your description to 2000 characters or less.'
    if (!formData.keyCapabilities || formData.keyCapabilities.length === 0)
      errors.keyCapabilities = 'Please select at least one capability.'
    if (!formData.complexity) errors.complexity = 'Please select a complexity level.'
  }
  if (step >= 3) {
    if (!formData.timeline) errors.timeline = 'Please select a preferred timeline.'
    if (!formData.budgetRange) errors.budgetRange = 'Please select an indicative budget range.'
  }
  return errors
}

export default function BlueprintWizard({ onResult }) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState(() => loadDraft() || EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState(null)
  const [direction, setDirection] = useState(1)

  // Persist draft on every change
  useEffect(() => {
    saveDraft(formData)
  }, [formData])

  const hasDraftData = Boolean(
    formData.serviceType ||
    formData.businessGoals ||
    formData.complexity ||
    (formData.keyCapabilities && formData.keyCapabilities.length > 0)
  )

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setErrors(prev => ({ ...prev, [field]: undefined }))
  }

  const handleNext = () => {
    const errs = validate(formData, step)
    const stepFields = {
      1: ['serviceType'],
      2: ['businessGoals', 'keyCapabilities', 'complexity'],
      3: ['timeline', 'budgetRange'],
    }
    const currentStepErrors = {}
    for (const field of (stepFields[step] || [])) {
      if (errs[field]) currentStepErrors[field] = errs[field]
    }
    if (Object.keys(currentStepErrors).length > 0) {
      setErrors(currentStepErrors)
      return
    }
    setErrors({})
    setDirection(1)
    setStep(s => Math.min(s + 1, TOTAL_STEPS))
  }

  const handleBack = () => {
    setErrors({})
    setDirection(-1)
    setStep(s => Math.max(s - 1, 1))
  }

  const handleReset = () => {
    clearDraft()
    setFormData(EMPTY_FORM)
    setErrors({})
    setApiError(null)
    setDirection(-1)
    setStep(1)
  }

  const handleSubmit = async () => {
    const allErrors = validate(formData, 4)
    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors)
      return
    }
    setLoading(true)
    setApiError(null)
    try {
      const payload = {
        serviceType: formData.serviceType,
        businessGoals: formData.businessGoals.trim(),
        keyCapabilities: formData.keyCapabilities,
        complexity: formData.complexity,
        timeline: formData.timeline,
        budgetRange: formData.budgetRange,
        contactName: formData.contactName?.trim() || null,
        companyName: formData.companyName?.trim() || null,
      }
      const blueprint = await generateBlueprint(payload)
      clearDraft()
      onResult(blueprint, formData)
    } catch (err) {
      setApiError(
        err.message || 'Something went wrong. Please check that the Spring Boot backend is running on port 8080 and try again.'
      )
      if (err.fieldErrors) {
        setErrors(err.fieldErrors)
      }
    } finally {
      setLoading(false)
    }
  }

  const slideVariants = {
    enter: (dir) => ({ x: dir > 0 ? 32 : -32, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -32 : 32, opacity: 0 }),
  }

  const stepProps = { formData, onChange: handleChange, errors }

  return (
    <section id="wizard" className="relative py-24 sm:py-32 scroll-mt-16">
      {/* Background ambient glow */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[450px] w-[800px] rounded-full"
          style={{
            background: 'radial-gradient(ellipse, rgba(6,182,212,0.08) 0%, transparent 65%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="text-center mb-12">
          <p className="overline mb-3">Discovery Wizard</p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight mb-3">
            Build your project blueprint
          </h2>
          <p className="text-slate-400 max-w-md mx-auto text-[15px] leading-relaxed">
            Four focused steps. No open-ended forms. Instant structured output.
          </p>
        </div>

        {/* Wizard card container */}
        <div className="relative rounded-2xl border border-[#1a2d48]/80 bg-[#0d1421] shadow-[0_24px_64px_rgba(0,0,0,0.5),0_0_0_1px_rgba(26,45,72,0.4)] overflow-hidden">

          {/* Top header & Step indicator */}
          <div className="px-6 sm:px-8 pt-7 pb-6 border-b border-[#1a2d48]/80 bg-[#0d1421]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-slate-400">
                  Step {step} of {TOTAL_STEPS}
                </span>
                <span className="text-slate-600">·</span>
                <span className="text-xs font-semibold text-cyan-400">
                  {STEP_LABELS[step - 1]}
                </span>
              </div>

              <div className="flex items-center gap-3">
                {hasDraftData && (
                  <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] text-slate-500">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80 animate-pulse" />
                    Draft auto-saved
                  </span>
                )}
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex items-center gap-1 text-[11px] font-medium text-slate-500 hover:text-slate-300 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 rounded px-1.5 py-0.5"
                  aria-label="Reset all inputs"
                >
                  <RotateCcw size={11} />
                  Reset
                </button>
              </div>
            </div>

            <StepIndicator currentStep={step} totalSteps={TOTAL_STEPS} steps={STEP_LABELS} />
          </div>

          {/* Step content */}
          <div className="px-6 sm:px-8 py-8 min-h-[460px] bg-[#0d1421]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              >
                {step === 1 && (
                  <Step1Service
                    value={formData.serviceType}
                    onChange={v => handleChange('serviceType', v)}
                    errors={errors}
                  />
                )}
                {step === 2 && <Step2Goals {...stepProps} />}
                {step === 3 && <Step3Timeline {...stepProps} />}
                {step === 4 && <Step4Review {...stepProps} />}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* API Error banner */}
          <AnimatePresence>
            {apiError && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mx-6 sm:mx-8 mb-6 overflow-hidden"
              >
                <div className="flex items-start gap-3 p-4 rounded-xl border border-red-500/30 bg-red-500/[0.08] text-red-300">
                  <AlertCircle size={16} className="shrink-0 mt-0.5 text-red-400" />
                  <div className="text-left">
                    <p className="text-sm font-semibold text-red-200">Unable to generate blueprint</p>
                    <p className="text-xs mt-0.5 text-red-300/90 leading-relaxed">{apiError}</p>
                    <p className="text-[11px] mt-1.5 text-red-400/70">
                      Ensure the Spring Boot backend is running on port 8080 or verify network connectivity.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer navigation */}
          <div className="px-6 sm:px-8 py-5 border-t border-[#1a2d48]/80 bg-[#0a0f1a] flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={handleBack}
              disabled={step === 1 || loading}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 border border-[#1a2d48]/80 bg-[#121c2e] hover:border-[#2a4268] hover:text-white transition-all disabled:opacity-30 disabled:pointer-events-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400"
            >
              <ChevronLeft size={15} />
              Back
            </button>

            {/* Clickable progress step dots */}
            <div className="flex items-center gap-1.5">
              {Array.from({ length: TOTAL_STEPS }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    if (i + 1 < step) {
                      setDirection(-1)
                      setStep(i + 1)
                    }
                  }}
                  disabled={i + 1 > step}
                  aria-label={`Jump to step ${i + 1}: ${STEP_LABELS[i]}`}
                  className={`rounded-full transition-all duration-300 ${
                    i + 1 === step
                      ? 'w-6 h-1.5 bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.5)]'
                      : i + 1 < step
                      ? 'w-2 h-1.5 bg-cyan-400/40 hover:bg-cyan-400/70 cursor-pointer'
                      : 'w-1.5 h-1.5 bg-[#1a2d48]'
                  }`}
                />
              ))}
            </div>

            {step < TOTAL_STEPS ? (
              <button
                type="button"
                onClick={handleNext}
                className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-xs font-semibold text-[#060b16] bg-cyan-400 hover:bg-cyan-300 transition-all duration-200 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_28px_rgba(6,182,212,0.45)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400 focus-visible:outline-offset-2"
              >
                Continue
                <ChevronRight size={15} />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-semibold text-[#060b16] bg-cyan-400 hover:bg-cyan-300 transition-all duration-200 shadow-[0_0_24px_rgba(6,182,212,0.35)] hover:shadow-[0_0_32px_rgba(6,182,212,0.5)] disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400 focus-visible:outline-offset-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Generating Blueprint…
                  </>
                ) : (
                  <>
                    <Sparkles size={14} />
                    Generate Blueprint
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
