/**
 * Export utilities for blueprint results.
 * copy-to-clipboard, email draft, and print-to-PDF
 */

/**
 * Copy a clean plain-text summary of the blueprint to the clipboard.
 */
export async function copyBlueprintSummary(blueprint) {
  const text = buildPlainTextBlueprint(blueprint)
  await navigator.clipboard.writeText(text)
}

/**
 * Open user's email client with a pre-formatted inquiry to Cynbit.
 * Uses official contact email: opportunities@cynbit.in
 */
export function openEmailDraft(blueprint, formData) {
  const subject = encodeURIComponent(`[Blueprint Inquiry] ${blueprint.projectTitle} (${blueprint.blueprintId})`)
  const body = encodeURIComponent(buildEmailBody(blueprint, formData))
  window.open(`mailto:opportunities@cynbit.in?subject=${subject}&body=${body}`, '_blank')
}

/**
 * Trigger browser print-to-PDF dialog with a professional document title.
 */
export function printBlueprint(blueprintTitle) {
  const originalTitle = document.title
  if (blueprintTitle) {
    document.title = `Cynbit Blueprint — ${blueprintTitle}`
  }
  window.print()
  if (blueprintTitle) {
    setTimeout(() => {
      document.title = originalTitle
    }, 1000)
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Formatters
// ─────────────────────────────────────────────────────────────────────────────

function buildPlainTextBlueprint(bp) {
  const lines = []
  const div = '═'.repeat(64)
  const subDiv = '─'.repeat(64)

  lines.push(div)
  lines.push(`CYNBIT TECHNOLOGIES — PRELIMINARY PROJECT BLUEPRINT`)
  lines.push(`Blueprint Reference : ${bp.blueprintId}`)
  lines.push(`Generated           : ${new Date(bp.generatedAt || Date.now()).toLocaleString('en-IN')}`)
  lines.push(`Status              : Preliminary Advisory Deliverable`)
  lines.push(div)
  lines.push(``)
  lines.push(`PROJECT: ${bp.projectTitle}`)
  lines.push(`Service Category : ${bp.serviceCategory}`)
  lines.push(`Complexity Tier  : ${bp.complexityLabel}`)
  lines.push(`Timeline Range   : ${bp.indicativeTimelineRange}`)
  lines.push(`Budget Note      : ${bp.indicativeBudgetNote}`)
  lines.push(``)
  lines.push(`EXECUTIVE SUMMARY:`)
  lines.push(bp.executiveSummary)
  lines.push(``)
  lines.push(subDiv)
  lines.push(`SUGGESTED MVP FEATURES:`)
  bp.mvpFeatures?.forEach(group => {
    lines.push(`\n[ ${group.category} ]`)
    group.features?.forEach(f => {
      lines.push(`  • [${f.priority}] ${f.name}`)
      lines.push(`    ${f.description}`)
    })
  })
  lines.push(``)
  lines.push(subDiv)
  lines.push(`RECOMMENDED TECHNOLOGY STACK:`)
  bp.recommendedStack?.layers?.forEach(l => {
    lines.push(`  • ${l.layer}: ${l.technologies?.join(', ')}`)
    lines.push(`    Rationale: ${l.rationale}`)
  })
  if (bp.recommendedStack?.cloudProviders?.length) {
    lines.push(`  • Cloud / Infrastructure: ${bp.recommendedStack.cloudProviders.join(', ')}`)
  }
  if (bp.recommendedStack?.devOpsTools?.length) {
    lines.push(`  • DevOps / CI/CD: ${bp.recommendedStack.devOpsTools.join(', ')}`)
  }
  lines.push(``)
  lines.push(subDiv)
  lines.push(`STAGED IMPLEMENTATION ROADMAP:`)
  bp.implementationRoadmap?.forEach(phase => {
    lines.push(`  Phase ${phase.phaseNumber}: ${phase.phaseName} (${phase.estimatedDuration})`)
    lines.push(`  Description: ${phase.description}`)
    if (phase.deliverables?.length) {
      lines.push(`  Key Deliverables:`)
      phase.deliverables.forEach(d => lines.push(`    ✓ ${d}`))
    }
    lines.push(``)
  })
  lines.push(subDiv)
  lines.push(`KEY ASSUMPTIONS:`)
  bp.assumptions?.forEach((a, i) => lines.push(`  ${i + 1}. ${a}`))
  lines.push(``)
  lines.push(subDiv)
  lines.push(`RECOMMENDED NEXT STEPS:`)
  bp.nextSteps?.forEach(ns => lines.push(`  ${ns.order}. ${ns.action} — ${ns.detail}`))
  lines.push(``)
  lines.push(div)
  lines.push(`DISCLAIMER:`)
  lines.push(bp.disclaimer)
  lines.push(``)
  lines.push(`Contact: opportunities@cynbit.in | +91 89479 62667`)
  lines.push(`Cynbit Technologies Private Limited · Jaipur, Rajasthan, India`)
  lines.push(`Website: https://cynbit.in · "Engineered for Optimism"`)
  lines.push(div)

  return lines.join('\n')
}

function buildEmailBody(blueprint, formData) {
  return `Hi Cynbit Engineering Team,

I generated a preliminary project blueprint using the Cynbit Blueprint Studio and would like to schedule a discovery call to discuss formal scoping, technical feasibility, and next steps.

────────────────────────────────────────────────────────────────
BLUEPRINT REFERENCE : ${blueprint.blueprintId}
PROJECT TITLE       : ${blueprint.projectTitle}
SERVICE CATEGORY    : ${blueprint.serviceCategory}
COMPLEXITY TIER     : ${blueprint.complexityLabel}
INDICATIVE TIMELINE : ${blueprint.indicativeTimelineRange}
INDICATIVE BUDGET   : ${blueprint.indicativeBudgetNote}
────────────────────────────────────────────────────────────────

EXECUTIVE SUMMARY:
${blueprint.executiveSummary}

CLIENT INFORMATION:
Contact Name : ${formData?.contactName || 'Not specified'}
Company Name : ${formData?.companyName || 'Not specified'}

Please get in touch with available discovery call slots.

Kind regards,
${formData?.contactName || 'Prospective Client'}
${formData?.companyName ? `(${formData.companyName})` : ''}
`
}
