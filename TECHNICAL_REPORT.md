# Cynbit Blueprint Studio — Technical Assessment Report

**Applicant Submission:** Full Stack Developer Intern Technical Assessment  
**Project:** Cynbit Blueprint Studio  
**Target Organization:** Cynbit Technologies Private Limited (`https://www.cynbit.in`)  
**Date:** October 31, 2026  
**Repository Location:** `d:\Cynbit prototype\cynbit-blueprint-studio`  

---

## 1. Problem Statement

Cynbit Technologies is an engineering-driven digital agency offering AI automation workflows, custom full-stack software development, cloud infrastructure architecture, and digital growth services.

In reviewing the customer journey on the existing Cynbit website (`https://www.cynbit.in`), prospective enterprise clients and startups seeking solutions encounter a standard open-ended communication channel: a basic contact form or direct mailto links (`opportunities@cynbit.in`). 

This pre-sales model introduces notable operational frictions:
- **High Cognitive Load on Prospective Clients:** Non-technical stakeholders and busy decision-makers often struggle to translate vague business goals into technical specifications, resulting in ambiguous inquiries.
- **Asymmetrical Information Gathering:** Cynbit's business development and engineering teams must spend multiple discovery calls asking repetitive questions regarding service domain, scale, complexity, and timeline.
- **Delayed Proposal Velocity:** The turnaround time between initial website contact and receiving a structured architectural proposal spans days or weeks.

---

## 2. Existing Website Analysis

A technical and UX audit of the live Cynbit website (`https://www.cynbit.in/`) was performed:

| Page / Component | Current Implementation | Identified Friction Point |
|---|---|---|
| **Homepage** | High-energy branding ("Engineered for Optimism", "We Build"), dark-mode aesthetic, showcase of core technical capabilities (AI Agents, Cloud, Full-Stack). | Clear positioning, but lacks an interactive tool to engage visitors before they decide to leave. |
| **Services Section** | Outlines AI Automation, Software Development, Cloud Architecture, and Digital Marketing. | Informational only. Clients must self-diagnose which combination of services, integrations, and architectures best fits their use case. |
| **Contact Page / CTA** | Generic fields (Name, Email, Message, Phone) pointing to `opportunities@cynbit.in` and Jaipur headquarters. | High friction. Open text areas offer no guidance on scoping parameters, milestones, or technical expectations. |
| **Pricing / Scoping** | No self-serve estimation or scoping guidance is available. | Enterprise pricing is inherently bespoke, but the lack of indicative framing leads to misaligned expectations. |

---

## 3. Proposed Improvement & Business Value

Rather than redesigning or cloning Cynbit's website, we engineered a dedicated high-value pre-sales capability: **Cynbit Blueprint Studio**.

### Core Value Delivered:
1. **Accelerated Pre-Sales Qualification:** Replaces the blank contact form with a structured 4-step wizard that captures:
   - Specific service domain (AI Automation, Software Dev, Cloud Infra, Digital Marketing)
   - Stated business goals in the client's own words
   - Multi-select technical capabilities
   - Project complexity tier (Focused MVP, Mid-Scale, Large-Scale, Enterprise)
   - Preferred delivery timeline and indicative investment range
2. **Instant Advisory Blueprint Deliverable:** Instead of a generic "Thank you, we'll get back to you", the client instantly receives a preliminary architectural deliverable:
   - Personalized project title and synthesized executive summary
   - Grouped MVP features with priority ratings (`HIGH`, `MEDIUM`, `LOW`)
   - Recommended technology stack with architectural rationale for each layer
   - Staged implementation roadmap with deliverables per phase
   - Key technical assumptions and next steps
3. **Actionable Pre-Filled Inquiry:** Provides one-click export (copy to clipboard, browser print-to-PDF, and pre-formatted email draft directed to `opportunities@cynbit.in`), ensuring Cynbit's sales engineers receive structured, actionable briefing data.
4. **Ethical Transparency:** The platform explicitly identifies itself as a preliminary advisory framework using deterministic recommendation logic, without misleading claims of black-box AI magic or binding price quotes.

---

## 4. System Architecture

The application is structured as a single clean monorepo:

```
cynbit-blueprint-studio/
├── backend/                       # Java 17 + Spring Boot 3.3.4 (Maven)
│   ├── src/main/java/in/cynbit/blueprint/
│   │   ├── BlueprintApplication.java            # Spring Boot main class
│   │   ├── config/CorsConfig.java               # Environment-configurable CORS policy
│   │   ├── controller/BlueprintController.java  # REST API endpoints (/health, /blueprints)
│   │   ├── dto/BlueprintRequestDTO.java         # Validated inbound request data model
│   │   ├── dto/BlueprintResponseDTO.java        # Structured record-based response deliverable
│   │   ├── exception/GlobalExceptionHandler.java # Uniform RFC-compliant error handler
│   │   └── service/BlueprintGenerationService.java # Deterministic recommendation engine
│   ├── src/test/java/in/cynbit/blueprint/service/
│   │   └── BlueprintGenerationServiceTest.java # 17 parameterised & unit test cases
│   ├── Dockerfile                               # Multi-stage production container build
│   └── pom.xml
│
└── frontend/                      # React 18 + Vite 5 (Tailwind CSS + Framer Motion)
    ├── src/
    │   ├── api/blueprint.js                     # Robust fetch client with error normalization
    │   ├── components/
    │   │   ├── wizard/                          # 4-step discovery wizard components
    │   │   ├── result/                          # Blueprint deliverable and action bars
    │   │   ├── Navigation.jsx                   # Sticky header with state-aware action links
    │   │   ├── Hero.jsx                         # Editorial hero with value proposition
    │   │   ├── ProductPreview.jsx               # Realistic software deliverable frame
    │   │   ├── HowItWorks.jsx                   # 3-step numbered sequence
    │   │   └── Footer.jsx                       # Verified contact details and legal stamps
    │   ├── utils/                               # export.js (PDF/Email) and localStorage.js
    │   ├── App.jsx                              # View orchestration and state management
    │   └── index.css                            # Dark SaaS design system tokens & print styles
    ├── vercel.json                              # SPA routing & deployment configuration
    └── package.json
```

---

## 5. Technology Stack & Justification

### Frontend:
- **React 18 & Vite 5:** Fast development refresh (HMR) and optimized rollup production bundles.
- **Tailwind CSS 3.4:** Enables a bespoke, maintainable design system without runtime CSS overhead.
- **Framer Motion 11.3:** Provides purposeful transitions between wizard steps and progressive reveal animations while honoring `prefers-reduced-motion`.
- **Lucide React:** Lightweight, accessible SVG icons.

### Backend:
- **Java 17 (LTS):** Modern language features (Records, Pattern Matching, Switch Expressions), strong type safety, and enterprise robustness.
- **Spring Boot 3.3.4:** Production-ready web stack with embedded Tomcat, robust lifecycle management, and built-in configuration externalization.
- **Jakarta Bean Validation:** Declarative constraints directly on DTO fields to reject malformed requests at the controller boundary.
- **JUnit 5 & AssertJ:** Comprehensive unit testing without requiring an expensive Spring context startup for pure domain logic.

---

## 6. Frontend Implementation

### 4-Step Discovery Wizard:
1. **Step 1 — Service Selection:** Visual interactive cards for AI Automation, Software Development, Cloud Infrastructure, and Digital Marketing & SEO.
2. **Step 2 — Business Goals & Capabilities:** Free-text goal input with real-time character counting (10–2000 chars), dynamic capability chips that adapt to the selected service, and complexity tier selection.
3. **Step 3 — Timeline & Budget:** Indicative timeline brackets (from `<3 months` to `12+ months`) and dual-currency budget brackets (`Under $50K (~₹40L)` to `$500K+ (~₹4Cr+)`).
4. **Step 4 — Review & Personalization:** Complete summary of selected parameters with optional contact name and company name fields.

### Key UX Details:
- **Auto-Saved Drafts:** Input state is persisted in `localStorage` on every keystroke, allowing users to refresh or return without data loss. A manual "Reset" action is provided.
- **Responsive Layout:** Fluidly adjusts across mobile devices (320px–480px), tablets, and widescreen desktop monitors.
- **Accessible Interactions:** Visible `focus-visible` rings on all interactive elements, semantic buttons, `aria-pressed` on selectable cards, and keyboard navigation support.

---

## 7. Java Spring Boot Backend Implementation

The backend follows clean layered architecture principles:
- **`BlueprintController`:** Exposes `GET /api/health` and `POST /api/blueprints`. Delegates to the service layer and returns strongly-typed DTO responses.
- **`BlueprintGenerationService`:** Implements deterministic, rule-based recommendation logic using Java 17 switch expressions. It evaluates service category, complexity tier, and selected capabilities to build tailored feature sets, architectural layers with explicit rationale, phased roadmaps (2 to 4 phases depending on complexity), assumptions, and next steps.
- **`CorsConfig`:** Configurable CORS using Spring's `CorsRegistry` and `allowedOriginPatterns`, supporting comma-separated origins from environment variables (`APP_CORS_ALLOWED_ORIGINS` or `app.cors.allowed-origins`).

---

## 8. API Design

### Endpoints:

#### 1. `GET /api/health`
- **Purpose:** System health and platform readiness probe.
- **Response:** `200 OK`
```json
{
  "status": "UP",
  "service": "Cynbit Blueprint Studio API",
  "version": "1.0.0"
}
```

#### 2. `POST /api/blueprints`
- **Purpose:** Generates a structured advisory blueprint.
- **Headers:** `Content-Type: application/json`, `Accept: application/json`
- **Request Body:**
```json
{
  "serviceType": "SOFTWARE_DEVELOPMENT",
  "businessGoals": "We need an enterprise customer portal with real-time analytics and role-based permissions.",
  "keyCapabilities": ["User Authentication", "Dashboard & Analytics", "REST APIs"],
  "complexity": "MEDIUM",
  "timeline": "THREE_TO_SIX_MONTHS",
  "budgetRange": "RANGE_50K_200K",
  "contactName": "Rahul Verma",
  "companyName": "Verma Enterprises"
}
```
- **Response Body (`BlueprintResponseDTO`):**
```json
{
  "blueprintId": "BPR-104C36E",
  "generatedAt": "2026-10-31T14:17:13.780",
  "projectTitle": "Verma Enterprises: Custom Software Development Blueprint",
  "serviceCategory": "Custom Software Development",
  "complexityLabel": "Mid-Scale",
  "executiveSummary": "This blueprint outlines a mid-scale custom software development engagement for Verma Enterprises...",
  "indicativeTimelineRange": "12–20 weeks",
  "indicativeBudgetNote": "Indicative range: $50K–$200K (~₹40L–₹1.6Cr). Supports a well-rounded product with primary integrations and QA.",
  "mvpFeatures": [
    {
      "category": "Core Application",
      "features": [
        { "name": "User Authentication & Authorisation", "priority": "HIGH" },
        { "name": "Core Domain Modules", "priority": "HIGH" },
        { "name": "RESTful API Layer", "priority": "HIGH" }
      ]
    }
  ],
  "recommendedStack": {
    "layers": [
      {
        "layer": "Backend API",
        "technologies": ["Java 17", "Spring Boot 3.x", "Spring Security + JWT", "Spring Data JPA"],
        "rationale": "Proven, strongly-typed JVM stack; Spring Boot accelerates production-readiness..."
      }
    ],
    "cloudProviders": ["Vercel (frontend)", "Railway / Render (backend)"],
    "devOpsTools": ["Docker", "GitHub Actions", "Maven"]
  },
  "implementationRoadmap": [
    {
      "phaseNumber": 1,
      "phaseName": "Foundation & Design",
      "estimatedDuration": "3–4 weeks",
      "deliverables": ["Signed-off requirements document", "Hi-fi Figma prototypes", "Database ERD"]
    }
  ],
  "assumptions": ["Client will provide a dedicated point-of-contact for requirements and sign-off..."],
  "nextSteps": [
    { "order": 1, "action": "Schedule a Discovery Call", "detail": "Contact: opportunities@cynbit.in" }
  ],
  "disclaimer": "This blueprint is a preliminary advisory document generated from your inputs..."
}
```

---

## 9. Validation & Error Handling

- **Client-Side Validation:** Per-step checks highlight invalid fields immediately before step transitions.
- **Server-Side Jakarta Validation:**
  - `@NotBlank(message = "Service type is required")`
  - `@NotBlank(message = "Business goals description is required")`
  - `@Size(min = 10, max = 2000, message = "Business goals must be between 10 and 2000 characters")`
  - `@NotNull @Size(min = 1, message = "Select at least one key capability")`
  - `@NotBlank(message = "Project complexity is required")`
  - `@NotBlank(message = "Timeline preference is required")`
  - `@NotBlank(message = "Budget range is required")`
- **`GlobalExceptionHandler`:** Intercepts `MethodArgumentNotValidException` and produces a structured 400 Bad Request response containing a map of specific field errors.
- **Frontend Resilience:** The API client intercepts network errors and displays a clear notification banner with recovery instructions.

---

## 10. Testing & Verification

### Backend Automated Test Suite (`mvn test`):
- **Total Test Cases Passed: 32 (0 failures, 0 errors, 0 skipped)**
- **Unit Test Class:** [`BlueprintGenerationServiceTest.java`](file:///d:/Cynbit%20prototype/cynbit-blueprint-studio/backend/src/test/java/in/cynbit/blueprint/service/BlueprintGenerationServiceTest.java) (25 tests)
  1. Full blueprint generation for AI Automation
  2. Software Development service label and stack resolution
  3. Complexity-driven roadmap scaling (4 phases for Enterprise vs. 2 for Focused MVP)
  4. Parameterized tech stack validation across all 4 service types
  5. Dynamic project title construction with company name trimming
  6. Project title fallback handling when company name is null
  7. Parameterized timeline resolution across all timeline/complexity combinations
  8. Executive summary reflects selected capabilities
  9. Service-specific technical assumptions (containerization for Cloud, dataset for AI, CMS access for Marketing)
  10. Enterprise governance assumptions (dedicated technical lead and SLA compliance)
  11. Executive summary personalization without stray hyphens (`for Apex Logistics, focused on...`)
  12. Executive summary personalization fallback to contact team when company is omitted
  13. Executive summary personalization fallback to generic organisation when both are omitted
  14. Parameterized budget note resolution confirming dual-currency formatting ($ and ₹) across all 4 tiers
  15. Complete service distinctiveness test verifying all 4 service types return non-overlapping titles, categories, stacks, and phased roadmaps
- **REST Controller Integration Test Class:** [`BlueprintControllerIntegrationTest.java`](file:///d:/Cynbit%20prototype/cynbit-blueprint-studio/backend/src/test/java/in/cynbit/blueprint/controller/BlueprintControllerIntegrationTest.java) (7 tests)
  1. `GET /api/health` returns HTTP 200 with `status: "UP"`, service name, and version
  2. `POST /api/blueprints` for `AI_AUTOMATION` returns HTTP 200 with validated advisory fields
  3. `POST /api/blueprints` for `SOFTWARE_DEVELOPMENT` returns HTTP 200 with full stack
  4. `POST /api/blueprints` for `CLOUD_INFRASTRUCTURE` returns HTTP 200 with IaC layers
  5. `POST /api/blueprints` for `DIGITAL_MARKETING` returns HTTP 200 with SEO layers
  6. `POST /api/blueprints` with missing required fields returns HTTP 400 with structured field errors
  7. `POST /api/blueprints` with `businessGoals` < 10 characters returns HTTP 400 with character constraint violation

### Live Spring Boot JAR Verification:
- Packaged executable JAR: `target/blueprint-studio-api-1.0.0.jar`
- Probed live endpoints over local TCP:
  - `GET /api/health` -> HTTP 200 `{"status":"UP","service":"Cynbit Blueprint Studio API","version":"1.0.0"}`
  - `POST /api/blueprints` tested for all 4 service types; verified distinct titles, categories, and dual-currency budget notes
  - `POST /api/blueprints` with empty payload verified HTTP 400 validation rejection
- Verified zero stray hyphens in executive summaries across all generated payloads

### Frontend Quality & Production Build:
- **Lint Check (`npm run lint`):** ESLint 9 Flat Config: **0 errors, 0 warnings**.
- **Production Build (`npm run build`):** Vite output generated in `frontend/dist/` (HTML: 1.12 kB, CSS: 42.47 kB, JS: 347 kB).

### Quality Assurance Audit Findings & Resolutions:
1. **Budget Currency Alignment:** Resolved the discrepancy where enum `UNDER_50K` was ambiguously labeled as `Under ₹50L`. Standardized across backend, frontend wizard, review screen, and DTO on dual-currency consulting tiers (`Under $50K (~₹40L)`, `$50K–$200K (~₹40L–₹1.6Cr)`, `$200K–$500K (~₹1.6Cr–₹4Cr)`, `$500K+ (~₹4Cr+)`), preserving backward compatibility with the existing enum and unit test contracts.
2. **Personalization Formatting:** Fixed the stray hyphen bug in `buildExecutiveSummary` (previously `req.getCompanyName() + " - "`), ensuring grammatically clean text (`"...engagement for Apex Logistics, focused on..."`). Added contact name badge display in the results header.
3. **Advisory Framing:** Verified all results headers, badges, and disclaimers explicitly label features, technologies, and milestones as preliminary recommendations for scoping discovery, not contracted deliverables.
4. **Action Handlers:** Verified Copy Summary (structured plain text), Export / Print PDF (print stylesheet), Email Cynbit Inquiry (`mailto:opportunities@cynbit.in`), and Edit Inputs (draft preserved in `localStorage`).

---

## 11. UI/UX & Accessibility

- **Midnight SaaS Aesthetic:** High-contrast background (`#060b16`), subtle surface borders (`#1a2d48`), electric cyan accents (`#06b6d4`, `#22d3ee`), and soft indigo ambient glows.
- **Micro-Interactions:** Subtle scale transitions on button click, hover feedback on service cards, animated progress bar connecting completed steps.
- **Typography Hierarchy:** Clean Inter font pairing with JetBrains Mono for code identifiers, reference IDs, and technical tags.
- **Print Stylesheet:** Custom `@media print` rules hide interactive chrome and format the blueprint into a high-contrast printable consulting deliverable suitable for saving as a PDF.
- **Accessibility:** Tested contrast ratios, visible keyboard focus indicators, screen-reader friendly `aria-pressed` states on selectable cards, and `prefers-reduced-motion` compliance.

---

## 12. Limitations & Future Improvements

While this MVP is complete and production-ready for assessment, future production iterations could include:
1. **Interactive Architecture Visualizer:** Integrating React Flow to render interactive cloud topology diagrams directly inside the blueprint.
2. **Calendar Scheduling Integration:** Connecting Calendly or Cal.com directly to Step 4 so prospective clients can book a discovery call in the same interaction.
3. **CRM Webhook Dispatch:** Dispatching a webhook event directly to Cynbit's internal CRM (e.g., HubSpot or Zoho) whenever a blueprint is generated.
4. **Multi-Currency Support:** Allowing international clients to view budget ranges in USD ($), EUR (€), or GBP (£) in addition to INR (₹).

---

## 13. Screenshots Representation

```
[ NAVIGATION BAR ]
Cynbit Blueprint Studio  ·  How It Works  ·  Preview  ·  cynbit.in  ·  [Build Blueprint]

[ HERO SECTION ]
Cynbit Technologies — Blueprint Studio
From business need to project blueprint.
Skip the vague inquiry. Answer four guided questions and receive a structured preliminary blueprint.
[Build Your Blueprint ->]   [See example output]

[ PRODUCT PREVIEW FRAME ]
Titlebar: blueprint-studio.cynbit.in / BPR-A4C9F1
Acme Retail: Autonomous AI Workflow Platform
MVP Features (5 items)  |  Stack: Java 17, Spring Boot, Kafka  |  Roadmap: 3 Phases

[ INTERACTIVE WIZARD CARD ]
Step 1 of 4 · Service
[AI Automation] [Software Development] [Cloud Infrastructure] [Digital Marketing]
Back                                                                     Continue ->

[ BLUEPRINT DELIVERABLE RESULT ]
BPR-104C36E · Advisory Blueprint Ready · Preliminary Deliverable
Verma Enterprises: Custom Software Development Blueprint
[Email Cynbit Inquiry] [Copy Summary] [Export / Print PDF] [Edit Inputs]
- Executive Summary & Timeline/Budget Badges
- MVP Features Matrix (Grouped by domain, with HIGH/MEDIUM priority badges)
- Recommended Technology Stack (with architectural rationale per layer)
- Phased Implementation Roadmap (Phases 1–3 with duration and deliverables)
- Key Assumptions & Next Steps
```

---

## 14. Repository & Live Deployment URLs

- **GitHub Repository:** `https://github.com/Bhanu2021-1/cynbit-blueprint-studio`
- **Frontend Live URL (Vercel):** `https://cynbit-blueprint-studio.vercel.app`
- **Backend Health Check (Render):** `https://cynbit-blueprint-api.onrender.com/api/health`
- **Backend Blueprint Endpoint (Render):** `https://cynbit-blueprint-api.onrender.com/api/blueprints`
- **Technical Report File:** `d:\Cynbit prototype\cynbit-blueprint-studio\TECHNICAL_REPORT.md`

---

*Cynbit Technologies Private Limited · 32/115 RHB, Pratap Nagar, Jaipur, Rajasthan 302033*  
*Contact: opportunities@cynbit.in · "Engineered for Optimism"*

