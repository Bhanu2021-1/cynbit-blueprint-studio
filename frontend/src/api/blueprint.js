/**
 * Blueprint API client
 *
 * Calls the Spring Boot REST API at POST /api/blueprints.
 * In development, Vite proxies /api -> http://localhost:8080.
 * In production (e.g. Vercel), set VITE_API_BASE_URL to your deployed backend URL.
 */

// Strip trailing slashes to prevent malformed URLs like https://api.com//api/blueprints
const rawBase = import.meta.env.VITE_API_BASE_URL || ''
const API_BASE = rawBase.replace(/\/+$/, '')

/**
 * Submit wizard inputs to the Spring Boot backend and receive a structured blueprint.
 *
 * @param {Object} payload - The wizard form data matching BlueprintRequestDTO
 * @returns {Promise<Object>} - The BlueprintResponseDTO from the server
 * @throws {Object} - { message, fieldErrors, status } on validation / server error
 */
export async function generateBlueprint(payload) {
  const url = `${API_BASE}/api/blueprints`

  let response
  try {
    response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
    })
  } catch {
    const targetDesc = API_BASE ? API_BASE : 'backend service'
    throw {
      message: `Could not connect to the Spring Boot API (${targetDesc}). Please verify the server is running and CORS allows this domain.`,
      fieldErrors: {},
      status: 0,
    }
  }

  let data
  try {
    data = await response.json()
  } catch {
    throw {
      message: `Backend returned HTTP ${response.status} with an unparseable response.`,
      fieldErrors: {},
      status: response.status,
    }
  }

  if (!response.ok) {
    // Structured response from GlobalExceptionHandler: { status, message, fieldErrors, timestamp }
    throw {
      message: data.message || 'Validation or processing error occurred. Please review your inputs.',
      fieldErrors: data.fieldErrors || {},
      status: response.status,
    }
  }

  return data
}

/**
 * Health check — returns status of the Spring Boot backend.
 * @returns {Promise<boolean>}
 */
export async function checkHealth() {
  try {
    const response = await fetch(`${API_BASE}/api/health`)
    return response.ok
  } catch {
    return false
  }
}
