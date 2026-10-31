# Cynbit Blueprint Studio

**An interactive project discovery and blueprint generator for Cynbit Technologies.**

> Independent Full Stack Developer Intern assessment prototype — demonstrates a guided discovery workflow as a meaningful improvement to the existing inquiry process at [cynbit.in](https://cynbit.in).

---

## Architecture

```
cynbit-blueprint-studio/
├── backend/          # Java 17 + Spring Boot 3.x REST API
│   ├── src/main/java/in/cynbit/blueprint/
│   │   ├── BlueprintApplication.java
│   │   ├── config/CorsConfig.java
│   │   ├── controller/BlueprintController.java
│   │   ├── dto/BlueprintRequestDTO.java
│   │   ├── dto/BlueprintResponseDTO.java
│   │   ├── exception/GlobalExceptionHandler.java
│   │   └── service/BlueprintGenerationService.java
│   └── pom.xml
│
└── frontend/         # React 18 + Vite + Tailwind CSS
    ├── src/
    │   ├── api/blueprint.js          # fetch() calls to Spring Boot
    │   ├── components/
    │   │   ├── wizard/               # 4-step discovery form
    │   │   ├── result/               # Blueprint output + export
    │   │   ├── Navigation.jsx
    │   │   ├── Hero.jsx
    │   │   ├── ProductPreview.jsx
    │   │   ├── HowItWorks.jsx
    │   │   └── Footer.jsx
    │   └── utils/                    # export, localStorage helpers
    └── package.json
```

---

## Running Locally

### Prerequisites
- **Java 17+** and **Maven 3.8+**
- **Node.js 18+** and **npm 9+**

### 1 — Start the Spring Boot backend

```bash
cd backend
mvn spring-boot:run
# API available at http://localhost:8080
# Health: http://localhost:8080/api/health
```

### 2 — Start the React frontend

```bash
cd frontend
npm install
npm run dev
# App available at http://localhost:5173
# Vite proxies /api → http://localhost:8080 automatically
```

### 3 — Run backend unit tests

```bash
cd backend
mvn test
```

---

## API Reference

### `POST /api/blueprints`

**Request body** (JSON):
```json
{
  "serviceType": "AI_AUTOMATION",
  "businessGoals": "We want to automate order processing...",
  "keyCapabilities": ["Workflow Automation", "Analytics"],
  "complexity": "MEDIUM",
  "timeline": "THREE_TO_SIX_MONTHS",
  "budgetRange": "RANGE_50K_200K",
  "contactName": "Jane Smith",
  "companyName": "Acme Corp"
}
```

**Valid enum values:**
| Field | Options |
|---|---|
| `serviceType` | `AI_AUTOMATION`, `SOFTWARE_DEVELOPMENT`, `CLOUD_INFRASTRUCTURE`, `DIGITAL_MARKETING` |
| `complexity` | `SMALL`, `MEDIUM`, `LARGE`, `ENTERPRISE` |
| `timeline` | `UNDER_3_MONTHS`, `THREE_TO_SIX_MONTHS`, `SIX_TO_TWELVE_MONTHS`, `OVER_TWELVE_MONTHS` |
| `budgetRange` | `UNDER_50K`, `RANGE_50K_200K`, `RANGE_200K_500K`, `OVER_500K` |

**Response:** `BlueprintResponseDTO` containing executive summary, MVP features, technology stack (with rationale), implementation roadmap, assumptions, next steps and disclaimer.

### `GET /api/health`
Returns `{ "status": "UP", "service": "Cynbit Blueprint Studio API", "version": "1.0.0" }`

---

## Deployment

### Frontend → Vercel
```bash
cd frontend
npm run build        # outputs to frontend/dist/
# Deploy dist/ to Vercel
# Set environment variable: VITE_API_BASE_URL=https://your-backend.example.com
```

### Backend → Railway / Render / any Java host
```bash
cd backend
mvn package -DskipTests
# Deploy the generated target/blueprint-studio-api-1.0.0.jar
# Set environment variable: APP_CORS_ALLOWED_ORIGINS=https://your-frontend.vercel.app
```

---

## Key Design Decisions

- **No AI APIs** — blueprint generation is deterministic, rule-based logic in `BlueprintGenerationService.java`. Output is transparent and explainable.
- **No database** — stateless API; drafts persist in `localStorage` on the frontend only.
- **No auth required** — zero-friction MVP; no sign-up, no API keys needed.
- **Jakarta Bean Validation** — all inputs validated server-side via `@Valid` annotations on the DTO.
- **CORS** configured via `application.properties` — override at deploy time without code changes.
- **localStorage draft persistence** — wizard inputs survive page refreshes; explicit Reset clears them.

---

*Cynbit Technologies · 32/115 RHB, Pratap Nagar, Jaipur, Rajasthan 302033 · opportunities@cynbit.in*
*"Engineered for Optimism"*

