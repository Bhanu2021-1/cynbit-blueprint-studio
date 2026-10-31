# Cynbit Blueprint Studio

**An interactive project discovery and preliminary blueprint generator for Cynbit Technologies.**

> **Assessment Submission:** Full Stack Developer Intern Technical Assessment  
> **Target Enterprise:** [Cynbit Technologies](https://cynbit.in) — Jaipur, Rajasthan, India  
> **Brand Stamp:** *"Engineered for Optimism"*

---

## Live Links & Repository

- **GitHub Repository:** `https://github.com/Bhanu2021-1/cynbit-blueprint-studio`
- **Frontend Live URL (Vercel):** `https://cynbit-blueprint-studio.vercel.app`
- **Backend Health Check (Render):** `https://cynbit-blueprint-api.onrender.com/api/health`
- **Backend Blueprint Endpoint:** `https://cynbit-blueprint-api.onrender.com/api/blueprints`
- **Technical Report:** [TECHNICAL_REPORT.md](./TECHNICAL_REPORT.md)

---

## 1. Problem Statement & Value Proposition

Cynbit Technologies offers AI Automation, Custom Software Engineering, Cloud Architecture, and Technical SEO. Currently, prospective clients submit unstructured inquiries via open-ended contact forms or email, resulting in:
1. **High Pre-Sales Friction:** Prospective clients often struggle to articulate scope, requirements, or technical constraints.
2. **Prolonged Discovery Cycles:** Initial discovery calls spend excessive time uncovering foundational requirements rather than solutions.
3. **Delayed Time-to-Proposal:** Cynbit engineers must manually map high-level goals into architectures and timelines.

### The Solution: Cynbit Blueprint Studio
An interactive discovery application that guides prospective clients through a structured 4-step workflow and generates a preliminary **Project Blueprint Deliverable** in real time:
- Executive Summary tailored to submitted business goals
- Grouped MVP Features with priority ratings (`HIGH`, `MEDIUM`, `LOW`)
- Recommended Technology Stack with architectural rationale per layer
- Staged Implementation Roadmap with estimated durations and milestones
- Key Technical Assumptions and Next Steps
- Export Actions: One-click clipboard copy, browser Print-to-PDF, and formatted pre-filled email draft to `opportunities@cynbit.in`

---

## 2. System Architecture

```
┌────────────────────────────────────────────────────────────────────────┐
│                        CLIENT / WEB BROWSER                            │
│                 React 18 + Vite 5 + Tailwind CSS                       │
│    (Interactive 4-Step Discovery Wizard, Draft Persistence, Preview)   │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    │ HTTPS POST /api/blueprints
                                    │ (JSON payload + Jakarta Validation)
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                     SPRING BOOT 3 REST BACKEND                         │
│                    Java 17 LTS (Render / Railway)                      │
│                                                                        │
│   ├── BlueprintController         (REST Endpoints: /health, /blueprints)│
│   ├── CorsConfig                  (Environment-driven CORS Origins)   │
│   ├── BlueprintRequestDTO         (Jakarta Bean Validation @Valid)    │
│   ├── BlueprintGenerationService  (Deterministic Recommendation Logic)│
│   ├── BlueprintResponseDTO        (Structured Advisory Deliverable)   │
│   └── GlobalExceptionHandler      (Standardized RFC-Compliant Errors) │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                     PRELIMINARY BLUEPRINT OUTPUT                       │
│    Executive Summary · MVP Features · Stack Rationale · Roadmap        │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Technology Stack & Justification

| Layer | Technology | Version | Rationale |
|---|---|---|---|
| **Frontend Framework** | React + Vite | React 18, Vite 5 | Fast HMR, optimized bundle splitting, modern concurrent features. |
| **Styling** | Tailwind CSS | 3.4 | Consistent design system tokens, utility-first dark mode layout. |
| **Motion** | Framer Motion | 11.3 | Fluid step transitions, accessible reduced-motion support. |
| **Icons** | Lucide React | 0.441 | Consistent, lightweight SVG icon suite. |
| **Backend Language** | Java (LTS) | Java 17 | Enterprise-grade strong typing, LTS security, high throughput. |
| **Backend Framework** | Spring Boot | 3.3.4 | Industry standard for robust, maintainable REST microservices. |
| **Validation** | Jakarta Validation | 3.0 | Declarative input constraint enforcement (`@NotBlank`, `@Size`). |
| **Build Tooling** | Apache Maven | 3.9 | Reproducible builds, dependency management, fat-JAR packaging. |
| **Unit Testing** | JUnit 5 + AssertJ | 5.10 | Comprehensive test coverage for deterministic business logic. |

---

## 4. API Reference

### `GET /api/health`
Health check endpoint for platform monitoring and uptime probes.

**Response (HTTP 200):**
```json
{
  "status": "UP",
  "service": "Cynbit Blueprint Studio API",
  "version": "1.0.0"
}
```

---

### `POST /api/blueprints`
Generates a structured, deterministic advisory blueprint based on submitted project requirements.

**Request Payload:**
```json
{
  "serviceType": "AI_AUTOMATION",
  "businessGoals": "We want to automate our customer order routing and inventory alerts across 3 warehouses.",
  "keyCapabilities": [
    "Workflow Automation",
    "Autonomous Agents",
    "ERP Integration"
  ],
  "complexity": "MEDIUM",
  "timeline": "THREE_TO_SIX_MONTHS",
  "budgetRange": "RANGE_50K_200K",
  "contactName": "Sarah Connor",
  "companyName": "Apex Logistics"
}
```

**Enum Options:**
- `serviceType`: `AI_AUTOMATION`, `SOFTWARE_DEVELOPMENT`, `CLOUD_INFRASTRUCTURE`, `DIGITAL_MARKETING`
- `complexity`: `SMALL`, `MEDIUM`, `LARGE`, `ENTERPRISE`
- `timeline`: `UNDER_3_MONTHS`, `THREE_TO_SIX_MONTHS`, `SIX_TO_TWELVE_MONTHS`, `OVER_TWELVE_MONTHS`
- `budgetRange`: `UNDER_50K`, `RANGE_50K_200K`, `RANGE_200K_500K`, `OVER_500K`

**Validation Error Response (HTTP 400):**
```json
{
  "status": 400,
  "message": "Validation failed — please check the highlighted fields",
  "fieldErrors": {
    "businessGoals": "Business goals must be between 10 and 2000 characters",
    "keyCapabilities": "Select at least one key capability"
  },
  "timestamp": "2026-10-31T14:17:13.780"
}
```

---

## 5. Local Setup & Execution

### Prerequisites
- **Java 17+** (OpenJDK / Eclipse Temurin)
- **Apache Maven 3.8+**
- **Node.js 18+** & **npm 9+**

### Step 1: Clone Repository
```bash
git clone https://github.com/Bhanu2021-1/cynbit-blueprint-studio.git
cd cynbit-blueprint-studio
```

### Step 2: Start Spring Boot Backend
```bash
cd backend
mvn spring-boot:run
# Server starts on http://localhost:8080
# Verify: curl http://localhost:8080/api/health
```

### Step 3: Start React Frontend
```bash
cd ../frontend
npm install
npm run dev
# Frontend runs on http://localhost:5173
# Automatically proxies /api requests to port 8080 in dev
```

### Step 4: Run Test Suites
```bash
# Backend unit tests (17 tests)
cd ../backend
mvn test

# Frontend lint check & production build
cd ../frontend
npm run lint
npm run build
```

---

## 6. Production Deployment Guide

### Backend Deployment (Render / Railway)
1. Link the GitHub repository.
2. Set **Root Directory** to `backend`.
3. Set **Build Command** to `mvn clean package -DskipTests`.
4. Set **Start Command** to `java -jar target/blueprint-studio-api-1.0.0.jar`.
5. Add Environment Variables:
   - `PORT`: `8080` (or leave default for auto-injection)
   - `APP_CORS_ALLOWED_ORIGINS`: `https://cynbit-blueprint-studio.vercel.app,http://localhost:5173`

### Frontend Deployment (Vercel)
1. Import the GitHub repository on [Vercel](https://vercel.com).
2. Set **Root Directory** to `frontend`.
3. Framework Preset: **Vite**.
4. Set Environment Variable:
   - `VITE_API_BASE_URL`: `https://cynbit-blueprint-api.onrender.com`
5. Deploy.

---

## 7. Key Engineering Principles

1. **Deterministic Business Logic:** Output is generated through a tested, rule-based recommendation matrix. No non-deterministic external AI calls or hallucinations.
2. **Defensive Validation:** Two layers of validation — client-side responsive feedback and server-side Jakarta Bean Validation with uniform error contracts.
3. **Stateless API:** No mandatory database required for the discovery phase; draft state persists gracefully in client `localStorage`.
4. **Accessible Design:** Meets WCAG contrast standards, visible focus outlines, keyboard navigable wizard cards, and `prefers-reduced-motion` compliance.

---

*Cynbit Technologies Private Limited · 32/115 RHB, Pratap Nagar, Jaipur, Rajasthan 302033*  
*Official Contact: opportunities@cynbit.in · "Engineered for Optimism"*
