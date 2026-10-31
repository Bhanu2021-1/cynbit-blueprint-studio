import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import ProductPreview from './components/ProductPreview'
import HowItWorks from './components/HowItWorks'
import BlueprintWizard from './components/wizard/BlueprintWizard'
import BlueprintResult from './components/result/BlueprintResult'
import Footer from './components/Footer'
import { saveResult, loadResult } from './utils/localStorage'

export default function App() {
  const [blueprint, setBlueprint] = useState(() => loadResult())
  const [lastFormData, setLastFormData] = useState(null)

  const handleResult = (blueprintData, formData) => {
    setBlueprint(blueprintData)
    setLastFormData(formData)
    saveResult(blueprintData)
    setTimeout(() => {
      document.querySelector('#result')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 120)
  }

  const handleEdit = () => {
    setBlueprint(null)
    setTimeout(() => {
      document.querySelector('#wizard')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 120)
  }

  return (
    <div className="min-h-screen bg-[#060b16] text-[#e8eeff] antialiased selection:bg-cyan-500/20 selection:text-white">
      <Navigation hasResult={Boolean(blueprint)} onStartClick={handleEdit} />

      <main>
        {/* Hero */}
        <Hero />

        {/* Product Preview */}
        <ProductPreview />

        {/* How It Works */}
        <HowItWorks />

        {/* Interactive Wizard or Blueprint Result */}
        <AnimatePresence mode="wait">
          {!blueprint ? (
            <motion.div
              key="wizard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <BlueprintWizard onResult={handleResult} />
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <BlueprintResult
                blueprint={blueprint}
                formData={lastFormData}
                onEdit={handleEdit}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  )
}
