/**
 * localStorage persistence helpers for draft wizard inputs and generated blueprints.
 * Keeps user progress across page refreshes and browser tabs.
 */

const DRAFT_KEY = 'cynbit_blueprint_draft'
const RESULT_KEY = 'cynbit_blueprint_result'

export function saveDraft(formData) {
  try {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(formData))
  } catch {
    // localStorage may be disabled in private browsing — fail gracefully
  }
}

export function loadDraft() {
  try {
    const raw = localStorage.getItem(DRAFT_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function clearDraft() {
  try {
    localStorage.removeItem(DRAFT_KEY)
  } catch {
    // ignore
  }
}

export function saveResult(blueprint) {
  try {
    localStorage.setItem(RESULT_KEY, JSON.stringify(blueprint))
  } catch {
    // ignore
  }
}

export function loadResult() {
  try {
    const raw = localStorage.getItem(RESULT_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function clearResult() {
  try {
    localStorage.removeItem(RESULT_KEY)
  } catch {
    // ignore
  }
}

export function clearAll() {
  try {
    localStorage.removeItem(DRAFT_KEY)
    localStorage.removeItem(RESULT_KEY)
  } catch {
    // ignore
  }
}
