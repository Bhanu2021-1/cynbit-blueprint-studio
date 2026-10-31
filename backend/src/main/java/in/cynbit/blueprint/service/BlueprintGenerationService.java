package in.cynbit.blueprint.service;

import in.cynbit.blueprint.dto.BlueprintRequestDTO;
import in.cynbit.blueprint.dto.BlueprintResponseDTO;
import in.cynbit.blueprint.dto.BlueprintResponseDTO.*;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

/**
 * Core blueprint-generation service.
 *
 * <p>Uses deterministic, rule-based logic keyed on service type, complexity,
 * timeline and selected capabilities. No external AI APIs or paid services are
 * called. All output is clearly labelled as advisory and preliminary.</p>
 *
 * <p>Design pattern: a chain of private helper methods build each section of
 * the blueprint independently, making the logic easy to unit-test and extend.</p>
 */
@Service
public class BlueprintGenerationService {

    private static final String DISCLAIMER =
            "This blueprint is a preliminary advisory document generated from your " +
            "inputs using Cynbit's structured recommendation framework. It does not " +
            "constitute a formal quote, binding proposal, or guarantee of delivery " +
            "timelines or costs. Suggested features, technology stacks, and roadmap " +
            "milestones represent recommended scope for scoping discovery, not contracted " +
            "or pre-built deliverables. Actual scope, timeline and investment will be " +
            "confirmed after a discovery session with the Cynbit engineering team.";

    // ─────────────────────────────────────────────────────────────────────────
    // Public API
    // ─────────────────────────────────────────────────────────────────────────

    public BlueprintResponseDTO generate(BlueprintRequestDTO req) {
        BlueprintResponseDTO response = new BlueprintResponseDTO();

        response.setBlueprintId(generateId());
        response.setGeneratedAt(LocalDateTime.now());
        response.setServiceCategory(resolveServiceLabel(req.getServiceType()));
        response.setComplexityLabel(resolveComplexityLabel(req.getComplexity()));
        response.setProjectTitle(buildProjectTitle(req));
        response.setExecutiveSummary(buildExecutiveSummary(req));
        response.setMvpFeatures(buildFeatures(req));
        response.setRecommendedStack(buildTechStack(req));
        response.setImplementationRoadmap(buildRoadmap(req));
        response.setIndicativeTimelineRange(resolveTimeline(req.getTimeline(), req.getComplexity()));
        response.setIndicativeBudgetNote(resolveBudgetNote(req.getBudgetRange()));
        response.setAssumptions(buildAssumptions(req));
        response.setNextSteps(buildNextSteps(req));
        response.setDisclaimer(DISCLAIMER);

        return response;
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Project title
    // ─────────────────────────────────────────────────────────────────────────

    String buildProjectTitle(BlueprintRequestDTO req) {
        String company = (req.getCompanyName() != null && !req.getCompanyName().isBlank())
                ? req.getCompanyName().trim() + ": " : "";
        // Use ASCII separator to avoid charset issues across environments
        return switch (req.getServiceType()) {
            case "AI_AUTOMATION"        -> company + "Autonomous AI Workflow Platform";
            case "SOFTWARE_DEVELOPMENT" -> company + "Custom Software Development Blueprint";
            case "CLOUD_INFRASTRUCTURE" -> company + "Cloud Architecture & Migration Blueprint";
            case "DIGITAL_MARKETING"    -> company + "Digital Growth & SEO Strategy Blueprint";
            default                      -> company + "Technology Project Blueprint";
        };
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Executive summary (uses free-text goals + capabilities)
    // ─────────────────────────────────────────────────────────────────────────

    String buildExecutiveSummary(BlueprintRequestDTO req) {
        String caps = String.join(", ", req.getKeyCapabilities());
        String serviceLabel = resolveServiceLabel(req.getServiceType());
        String complexityLabel = resolveComplexityLabel(req.getComplexity());
        String company = (req.getCompanyName() != null && !req.getCompanyName().isBlank())
                ? req.getCompanyName().trim()
                : (req.getContactName() != null && !req.getContactName().isBlank()
                    ? req.getContactName().trim() + "'s team"
                    : "your organisation");

        return String.format(
            "This blueprint outlines a %s %s engagement for %s, focused on delivering " +
            "capabilities in: %s. " +
            "Based on your stated goals — \"%s\" — the recommended approach prioritises " +
            "rapid value delivery in the first phase, followed by iterative capability " +
            "expansion aligned to measurable business outcomes. " +
            "The architecture is designed for scalability and operational resilience from day one.",
            complexityLabel.toLowerCase(),
            serviceLabel.toLowerCase(),
            company,
            caps,
            truncate(req.getBusinessGoals(), 180)
        );
    }

    // ─────────────────────────────────────────────────────────────────────────
    // MVP Features — keyed on service type + selected capabilities
    // ─────────────────────────────────────────────────────────────────────────

    List<FeatureGroup> buildFeatures(BlueprintRequestDTO req) {
        return switch (req.getServiceType()) {
            case "AI_AUTOMATION"        -> aiAutomationFeatures(req);
            case "SOFTWARE_DEVELOPMENT" -> softwareDevFeatures(req);
            case "CLOUD_INFRASTRUCTURE" -> cloudInfraFeatures(req);
            case "DIGITAL_MARKETING"    -> digitalMarketingFeatures(req);
            default                      -> softwareDevFeatures(req);
        };
    }

    private List<FeatureGroup> aiAutomationFeatures(BlueprintRequestDTO req) {
        List<Feature> core = new ArrayList<>(List.of(
            new Feature("Workflow Orchestration Engine", "Visual drag-and-drop pipeline builder for multi-step automation flows", "HIGH"),
            new Feature("AI Agent Framework", "Configurable autonomous agents with defined goals, tools and escalation policies", "HIGH"),
            new Feature("Integration Hub", "Pre-built connectors for CRMs, ERPs, email, Slack and REST webhooks", "HIGH")
        ));
        List<Feature> intelligence = new ArrayList<>(List.of(
            new Feature("Natural Language Triggers", "Parse email / chat intent and auto-route to the correct workflow", "MEDIUM"),
            new Feature("Anomaly & Exception Handling", "Rule-based detection of workflow failures with auto-retry and alerting", "HIGH")
        ));
        if (req.getKeyCapabilities().contains("Analytics") || req.getKeyCapabilities().contains("Reporting")) {
            intelligence.add(new Feature("Performance Dashboard", "Real-time metrics on automation throughput, error rates and ROI", "MEDIUM"));
        }
        if (req.getKeyCapabilities().contains("Predictive") || req.getKeyCapabilities().contains("ML")) {
            intelligence.add(new Feature("Predictive Scoring Module", "Rule-based scoring engine for lead qualification and demand forecasting", "MEDIUM"));
        }
        List<Feature> ops = new ArrayList<>(List.of(
            new Feature("Role-Based Access Control", "Granular permissions per workflow, team and environment", "HIGH"),
            new Feature("Audit Trail", "Immutable log of all agent decisions and workflow executions", "HIGH")
        ));
        return List.of(
            new FeatureGroup("Core Automation", core),
            new FeatureGroup("Intelligence & Monitoring", intelligence),
            new FeatureGroup("Operations & Security", ops)
        );
    }

    private List<FeatureGroup> softwareDevFeatures(BlueprintRequestDTO req) {
        List<Feature> core = new ArrayList<>(List.of(
            new Feature("User Authentication & Authorisation", "Secure registration, login, JWT sessions and role management", "HIGH"),
            new Feature("Core Domain Modules", "Primary business entities, CRUD operations and business-rule enforcement", "HIGH"),
            new Feature("RESTful API Layer", "Documented, versioned API endpoints consumed by web and mobile clients", "HIGH")
        ));
        List<Feature> ux = new ArrayList<>(List.of(
            new Feature("Responsive Web Application", "Accessible, mobile-first UI with component library and design system", "HIGH"),
            new Feature("Real-Time Notifications", "In-app and email/push notification system for key events", "MEDIUM")
        ));
        if (req.getKeyCapabilities().contains("Dashboard") || req.getKeyCapabilities().contains("Analytics")) {
            ux.add(new Feature("Analytics Dashboard", "Configurable charts, KPI cards and data-export for business metrics", "MEDIUM"));
        }
        if (req.getKeyCapabilities().contains("Mobile")) {
            ux.add(new Feature("Progressive Web App / Mobile Shell", "Installable PWA or React Native wrapper for iOS and Android", "MEDIUM"));
        }
        List<Feature> platform = new ArrayList<>(List.of(
            new Feature("Admin Control Panel", "Internal tooling for user management, feature flags and data operations", "HIGH"),
            new Feature("Automated Testing Suite", "Unit, integration and end-to-end test coverage with CI gate", "HIGH")
        ));
        return List.of(
            new FeatureGroup("Core Application", core),
            new FeatureGroup("User Experience", ux),
            new FeatureGroup("Platform & Quality", platform)
        );
    }

    private List<FeatureGroup> cloudInfraFeatures(BlueprintRequestDTO req) {
        List<Feature> infra = new ArrayList<>(List.of(
            new Feature("Infrastructure as Code (IaC)", "Terraform or CloudFormation templates for reproducible environments", "HIGH"),
            new Feature("Multi-Environment Pipeline", "Isolated dev / staging / production environments with promotion gates", "HIGH"),
            new Feature("Container Orchestration", "Kubernetes (EKS / GKE / AKS) with auto-scaling and health checks", "HIGH")
        ));
        List<Feature> security = new ArrayList<>(List.of(
            new Feature("Network Security Architecture", "VPC design, security groups, WAF and DDoS mitigation", "HIGH"),
            new Feature("Secrets & Key Management", "Cloud-native secrets manager integration with rotation policies", "HIGH")
        ));
        if (req.getKeyCapabilities().contains("Observability") || req.getKeyCapabilities().contains("Monitoring")) {
            security.add(new Feature("Unified Observability Stack", "Centralised logging, distributed tracing and metrics with alerting", "HIGH"));
        }
        List<Feature> ops = new ArrayList<>(List.of(
            new Feature("CI/CD Pipeline", "Automated build, test and deployment pipeline with rollback capability", "HIGH"),
            new Feature("Disaster Recovery Plan", "RTO/RPO-aligned backup strategy, failover runbooks and chaos testing", "MEDIUM"),
            new Feature("Cost Governance Dashboard", "Tagging strategy, budget alerts and resource-utilisation reporting", "MEDIUM")
        ));
        return List.of(
            new FeatureGroup("Infrastructure Foundation", infra),
            new FeatureGroup("Security & Compliance", security),
            new FeatureGroup("Operations & Reliability", ops)
        );
    }

    private List<FeatureGroup> digitalMarketingFeatures(BlueprintRequestDTO req) {
        List<Feature> seo = new ArrayList<>(List.of(
            new Feature("Technical SEO Audit & Remediation", "Crawl-error fixing, Core Web Vitals optimisation and structured data", "HIGH"),
            new Feature("Keyword & Content Architecture", "Keyword gap analysis, topic cluster design and content brief generation", "HIGH"),
            new Feature("On-Page Optimisation", "Meta, heading, schema and internal-link improvements across priority pages", "HIGH")
        ));
        List<Feature> growth = new ArrayList<>(List.of(
            new Feature("Performance Marketing Setup", "Google Ads / Meta campaign structure with conversion tracking", "MEDIUM"),
            new Feature("Marketing Automation", "Email nurture sequences, lead scoring and CRM integration", "MEDIUM")
        ));
        if (req.getKeyCapabilities().contains("Analytics") || req.getKeyCapabilities().contains("Reporting")) {
            growth.add(new Feature("Analytics & Reporting Stack", "GA4, Looker Studio dashboards and monthly SEO health reports", "HIGH"));
        }
        List<Feature> content = new ArrayList<>(List.of(
            new Feature("Content Production Framework", "Editorial calendar, style guide and SEO-first brief templates", "MEDIUM"),
            new Feature("Conversion Rate Optimisation", "Landing page A/B tests, heatmaps and funnel analysis", "MEDIUM")
        ));
        return List.of(
            new FeatureGroup("SEO Foundation", seo),
            new FeatureGroup("Growth & Acquisition", growth),
            new FeatureGroup("Content & Conversion", content)
        );
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Technology Stack — keyed on service type + complexity
    // ─────────────────────────────────────────────────────────────────────────

    TechStack buildTechStack(BlueprintRequestDTO req) {
        return switch (req.getServiceType()) {
            case "AI_AUTOMATION"        -> aiAutomationStack(req);
            case "SOFTWARE_DEVELOPMENT" -> softwareDevStack(req);
            case "CLOUD_INFRASTRUCTURE" -> cloudInfraStack(req);
            case "DIGITAL_MARKETING"    -> digitalMarketingStack(req);
            default                      -> softwareDevStack(req);
        };
    }

    private TechStack aiAutomationStack(BlueprintRequestDTO req) {
        boolean isEnterprise = req.getComplexity().equals("ENTERPRISE") || req.getComplexity().equals("LARGE");
        List<StackLayer> layers = new ArrayList<>(List.of(
            new StackLayer("Orchestration Runtime",
                List.of("Java 17 + Spring Boot 3", "Apache Kafka (event streaming)", isEnterprise ? "Temporal (durable workflow engine)" : "Spring State Machine"),
                "Spring Boot provides a production-grade foundation; Kafka decouples workflow steps for reliability and scale"),
            new StackLayer("Agent & AI Layer",
                List.of("LangChain4j (Java LLM integration)", "Rule-based decision engine (Drools)", "OpenNLP / custom NLP pipeline"),
                "Deterministic rule engines are combined with optional LLM calls for classification tasks"),
            new StackLayer("Data & Storage",
                List.of("PostgreSQL (relational state)", "Redis (caching & pub/sub)", isEnterprise ? "Elasticsearch (audit search)" : "Structured JSON logs"),
                "PostgreSQL stores workflow state; Redis handles high-throughput ephemeral data"),
            new StackLayer("Frontend & Dashboard",
                List.of("React 18 + Vite", "Tailwind CSS", "Recharts / Chart.js"),
                "Lightweight, fast React dashboard for workflow monitoring and configuration")
        ));
        return new TechStack(layers,
            isEnterprise ? List.of("AWS (primary)", "GCP (ML workloads)") : List.of("AWS", "Railway"),
            List.of("Docker", "GitHub Actions", isEnterprise ? "Kubernetes (EKS)" : "Docker Compose"));
    }

    private TechStack softwareDevStack(BlueprintRequestDTO req) {
        boolean isEnterprise = req.getComplexity().equals("ENTERPRISE");
        boolean hasMobile = req.getKeyCapabilities().contains("Mobile");
        List<StackLayer> layers = new ArrayList<>(List.of(
            new StackLayer("Backend API",
                List.of("Java 17", "Spring Boot 3.x", "Spring Security + JWT", "Spring Data JPA"),
                "Proven, strongly-typed JVM stack; Spring Boot accelerates production-readiness with built-in observability"),
            new StackLayer("Database",
                List.of("PostgreSQL 16", isEnterprise ? "Redis (caching)" : "Flyway (migrations)"),
                "PostgreSQL offers ACID compliance and excellent JSON support for semi-structured data"),
            new StackLayer("Frontend",
                List.of("React 18", "Vite", "Tailwind CSS", hasMobile ? "React Native (mobile)" : "React Router v6"),
                "Vite delivers sub-second HMR; React 18 concurrent features improve perceived performance"),
            new StackLayer("API Documentation",
                List.of("SpringDoc OpenAPI (Swagger UI)", "Postman collection"),
                "Automated API docs from code annotations ensure frontend-backend contract is always up to date")
        ));
        return new TechStack(layers,
            List.of("Vercel (frontend)", isEnterprise ? "AWS ECS (backend)" : "Railway / Render (backend)"),
            List.of("Docker", "GitHub Actions", "Maven"));
    }

    private TechStack cloudInfraStack(BlueprintRequestDTO req) {
        boolean isEnterprise = req.getComplexity().equals("ENTERPRISE") || req.getComplexity().equals("LARGE");
        List<StackLayer> layers = new ArrayList<>(List.of(
            new StackLayer("Infrastructure as Code",
                List.of("Terraform", isEnterprise ? "Terragrunt (DRY IaC)" : "Terraform Cloud"),
                "Terraform enables version-controlled, reproducible infrastructure across all environments"),
            new StackLayer("Container Platform",
                List.of(isEnterprise ? "Kubernetes (EKS/GKE)" : "AWS ECS Fargate", "Helm charts", "NGINX Ingress"),
                "Managed container services remove undifferentiated heavy lifting while preserving scalability"),
            new StackLayer("Observability",
                List.of("Prometheus + Grafana", "OpenTelemetry (distributed tracing)", "ELK Stack (logging)"),
                "OpenTelemetry is vendor-neutral and future-proofs the observability investment"),
            new StackLayer("Security & Networking",
                List.of("AWS WAF / Cloudflare", "VPC with private subnets", "AWS Secrets Manager", "cert-manager (TLS)"),
                "Defence-in-depth at network and application layers")
        ));
        return new TechStack(layers,
            List.of(isEnterprise ? "AWS (multi-region)" : "AWS", isEnterprise ? "GCP (DR site)" : "Cloudflare CDN"),
            List.of("Terraform", "GitHub Actions", "ArgoCD", "Helm"));
    }

    private TechStack digitalMarketingStack(BlueprintRequestDTO req) {
        List<StackLayer> layers = new ArrayList<>(List.of(
            new StackLayer("Web Platform",
                List.of("Next.js 14 (SSR/SSG)", "Tailwind CSS", "Vercel Edge Network"),
                "Server-side rendering maximises Core Web Vitals and Googlebot crawl efficiency"),
            new StackLayer("Analytics & Tracking",
                List.of("GA4 + Google Tag Manager", "Looker Studio (reporting)", "Hotjar (heatmaps)"),
                "GA4 event model supports cross-platform journeys; GTM allows no-code tag management"),
            new StackLayer("SEO Tooling",
                List.of("Screaming Frog", "Ahrefs / SEMrush", "Google Search Console API"),
                "Programmatic Search Console access enables automated rank-tracking and alerting"),
            new StackLayer("Marketing Automation",
                List.of("HubSpot CRM (free tier)", "Mailchimp / Brevo (email)", "Zapier (integrations)"),
                "HubSpot CRM provides a strong foundation without upfront cost for early-stage programmes")
        ));
        return new TechStack(layers,
            List.of("Vercel (web hosting)", "Cloudflare (DNS + CDN)"),
            List.of("GitHub Actions (deploy)", "Lighthouse CI (performance gate)"));
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Roadmap — phased by complexity
    // ─────────────────────────────────────────────────────────────────────────

    List<Phase> buildRoadmap(BlueprintRequestDTO req) {
        boolean isSmall = req.getComplexity().equals("SMALL");
        boolean isEnterprise = req.getComplexity().equals("ENTERPRISE");

        return switch (req.getServiceType()) {
            case "AI_AUTOMATION"        -> aiAutomationRoadmap(isSmall, isEnterprise);
            case "SOFTWARE_DEVELOPMENT" -> softwareDevRoadmap(isSmall, isEnterprise);
            case "CLOUD_INFRASTRUCTURE" -> cloudInfraRoadmap(isSmall, isEnterprise);
            case "DIGITAL_MARKETING"    -> digitalMarketingRoadmap(isSmall, isEnterprise);
            default                      -> softwareDevRoadmap(isSmall, isEnterprise);
        };
    }

    private List<Phase> aiAutomationRoadmap(boolean small, boolean enterprise) {
        List<Phase> phases = new ArrayList<>();
        phases.add(new Phase(1, "Discovery & Architecture",
            "Define workflow requirements, map current manual processes, design data flow and agent topology.",
            List.of("Process inventory document", "System-context diagram", "Agent responsibility matrix", "Tech stack sign-off"),
            small ? "2–3 weeks" : "3–5 weeks"));
        phases.add(new Phase(2, "Core Platform Build",
            "Implement workflow engine, base agent framework, integration connectors and admin dashboard.",
            List.of("Functional workflow orchestrator", "2–3 key integrations live", "Admin dashboard v1", "Unit + integration tests"),
            small ? "4–6 weeks" : "8–12 weeks"));
        if (!small) {
            phases.add(new Phase(3, "Intelligence Layer",
                "Add NLP triggers, exception-handling agents, predictive modules and performance monitoring.",
                List.of("NLP intent classifier", "Anomaly detection rules", "Real-time metrics dashboard", "Load testing"),
                enterprise ? "8–10 weeks" : "5–7 weeks"));
        }
        if (enterprise) {
            phases.add(new Phase(4, "Scale & Hardening",
                "Multi-tenant isolation, SLA-based SLOs, chaos testing, documentation and handover.",
                List.of("Multi-tenant architecture", "SLO dashboards", "Runbooks & playbooks", "Team knowledge transfer"),
                "6–8 weeks"));
        }
        return phases;
    }

    private List<Phase> softwareDevRoadmap(boolean small, boolean enterprise) {
        List<Phase> phases = new ArrayList<>();
        phases.add(new Phase(1, "Foundation & Design",
            "Requirements finalization, UI/UX wireframes, database schema design, CI/CD pipeline setup and project scaffolding.",
            List.of("Signed-off requirements document", "Hi-fi Figma prototypes", "Database ERD", "CI/CD pipeline live", "Boilerplate codebase"),
            small ? "2–3 weeks" : "3–4 weeks"));
        phases.add(new Phase(2, "Core Feature Development",
            "Build authentication, primary domain modules, REST APIs and the main user-facing application shell.",
            List.of("Working auth system", "Core domain APIs (CRUD + business rules)", "Frontend shell with routing", "API documentation"),
            small ? "4–6 weeks" : "8–10 weeks"));
        phases.add(new Phase(3, "Feature Completion & Integration",
            "Complete secondary features, third-party integrations, admin panel, notification system and QA.",
            List.of("All planned features implemented", "Third-party integrations live", "Admin control panel", "End-to-end test suite"),
            small ? "2–4 weeks" : enterprise ? "8–10 weeks" : "5–7 weeks"));
        if (enterprise) {
            phases.add(new Phase(4, "Performance, Security & Launch",
                "Security audit, load testing, performance optimisation, staging UAT, production deployment and hypercare.",
                List.of("OWASP security review", "Load test at 10× expected load", "UAT sign-off", "Production launch", "30-day hypercare support"),
                "4–6 weeks"));
        }
        return phases;
    }

    private List<Phase> cloudInfraRoadmap(boolean small, boolean enterprise) {
        List<Phase> phases = new ArrayList<>();
        phases.add(new Phase(1, "Assessment & Architecture Design",
            "Audit existing infrastructure, define target architecture, establish cloud accounts, IAM and network topology.",
            List.of("Current-state assessment report", "Target architecture diagram", "Cloud account structure", "Network design document"),
            small ? "1–2 weeks" : "2–4 weeks"));
        phases.add(new Phase(2, "Foundation Build",
            "Provision core infrastructure via IaC, establish CI/CD pipelines, set up observability and configure environments.",
            List.of("Terraform modules for VPC, compute, DB", "Multi-environment pipeline", "Observability stack live", "Security baseline"),
            small ? "3–4 weeks" : "6–8 weeks"));
        if (!small) {
            phases.add(new Phase(3, "Migration & Validation",
                "Migrate workloads incrementally, validate performance, security posture and cost baselines.",
                List.of("Workloads migrated and validated", "Cost baseline established", "Security audit passed", "Runbooks complete"),
                enterprise ? "8–12 weeks" : "4–6 weeks"));
        }
        if (enterprise) {
            phases.add(new Phase(4, "Optimisation & Governance",
                "FinOps optimisation, disaster recovery testing, team enablement and operational handover.",
                List.of("Cost optimisation report (target: ≥20% savings)", "DR failover test passed", "Team runbooks", "Governance framework"),
                "4–6 weeks"));
        }
        return phases;
    }

    private List<Phase> digitalMarketingRoadmap(boolean small, boolean enterprise) {
        List<Phase> phases = new ArrayList<>();
        phases.add(new Phase(1, "Audit & Strategy",
            "Full technical SEO audit, competitor analysis, keyword research, content gap analysis and 90-day roadmap.",
            List.of("Technical audit report", "Keyword opportunity matrix", "Content strategy document", "Quick-win fix list"),
            "2–3 weeks"));
        phases.add(new Phase(2, "Technical Remediation & Foundation",
            "Fix critical technical issues, implement structured data, optimise Core Web Vitals and set up tracking.",
            List.of("CWV scores in 'Good' range", "Structured data live", "GA4 + GTM fully configured", "Search Console verified"),
            small ? "3–4 weeks" : "4–6 weeks"));
        phases.add(new Phase(3, "Content & Authority Building",
            "Publish optimised content against target keyword clusters, launch link-building programme and A/B test landing pages.",
            List.of("12+ SEO articles published", "Link-building pipeline active", "Landing page A/B tests running", "Monthly reporting dashboard"),
            small ? "4–8 weeks" : enterprise ? "12–16 weeks" : "8–12 weeks"));
        if (enterprise) {
            phases.add(new Phase(4, "Scale & Automation",
                "Marketing automation flows, performance campaign optimisation, international SEO (if applicable) and reporting automation.",
                List.of("Email nurture sequences live", "PPC campaigns optimised to target CPA", "International hreflang (if applicable)", "Automated weekly reports"),
                "8–12 weeks"));
        }
        return phases;
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Assumptions
    // ─────────────────────────────────────────────────────────────────────────

    List<String> buildAssumptions(BlueprintRequestDTO req) {
        List<String> list = new ArrayList<>(List.of(
            "Client will provide a dedicated point-of-contact for requirements and sign-off",
            "Access to existing systems, credentials and technical documentation will be provided at project kick-off",
            "The scope described in this blueprint covers initial MVP; post-MVP enhancements will be scoped separately",
            "Timeline estimates assume timely feedback cycles (≤3 business days) at each milestone"
        ));
        if (req.getServiceType().equals("CLOUD_INFRASTRUCTURE")) {
            list.add("Existing workloads are containerisable or have documented dependencies");
            list.add("Cloud provider accounts will be provisioned with appropriate spending limits before Phase 1");
        }
        if (req.getServiceType().equals("AI_AUTOMATION")) {
            list.add("Required data sources are accessible via documented APIs or database connections");
            list.add("Initial automation workflows will be trained on a representative sample dataset provided by the client");
        }
        if (req.getServiceType().equals("DIGITAL_MARKETING")) {
            list.add("Client has full ownership of the website's CMS and can implement technical changes");
            list.add("Content review and approval cycle is ≤5 business days per article");
        }
        if (req.getComplexity().equals("ENTERPRISE")) {
            list.add("A dedicated Cynbit project manager and technical lead will be assigned for the duration");
            list.add("Enterprise integrations may require third-party vendor cooperation and their own procurement lead times");
        }
        return list;
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Next Steps
    // ─────────────────────────────────────────────────────────────────────────

    List<NextStep> buildNextSteps(BlueprintRequestDTO req) {
        return List.of(
            new NextStep(1, "Schedule a Discovery Call",
                "Share this blueprint with the Cynbit team and book a 30-minute discovery session to validate requirements and answer questions. Contact: opportunities@cynbit.in"),
            new NextStep(2, "Receive a Formal Proposal",
                "After the discovery call, Cynbit will provide a detailed Statement of Work (SOW) with fixed-price or time-and-material engagement options"),
            new NextStep(3, "Project Kick-Off",
                "Once the SOW is signed, a project kick-off will be held to align on communication cadence, tooling access and the Phase 1 sprint plan"),
            new NextStep(4, "Iterative Delivery",
                "Cynbit follows two-week sprint cycles with bi-weekly demos, ensuring continuous visibility and the ability to course-correct early")
        );
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Lookup helpers
    // ─────────────────────────────────────────────────────────────────────────

    String resolveServiceLabel(String serviceType) {
        return switch (serviceType) {
            case "AI_AUTOMATION"        -> "AI Automation & Autonomous Agents";
            case "SOFTWARE_DEVELOPMENT" -> "Custom Software Development";
            case "CLOUD_INFRASTRUCTURE" -> "Cloud Infrastructure & Architecture";
            case "DIGITAL_MARKETING"    -> "Digital Marketing & Technical SEO";
            default                      -> "Technology Services";
        };
    }

    String resolveComplexityLabel(String complexity) {
        return switch (complexity) {
            case "SMALL"      -> "Focused";
            case "MEDIUM"     -> "Mid-Scale";
            case "LARGE"      -> "Large-Scale";
            case "ENTERPRISE" -> "Enterprise";
            default            -> "Standard";
        };
    }

    String resolveTimeline(String timeline, String complexity) {
        return switch (timeline) {
            case "UNDER_3_MONTHS"         -> "6–10 weeks (expedited scope recommended)";
            case "THREE_TO_SIX_MONTHS"    -> "12–20 weeks";
            case "SIX_TO_TWELVE_MONTHS"   -> "24–40 weeks";
            case "OVER_TWELVE_MONTHS"     -> "40+ weeks (phased programme)";
            default                        -> "To be confirmed after discovery";
        };
    }

    String resolveBudgetNote(String budgetRange) {
        return switch (budgetRange) {
            case "UNDER_50K"       -> "Indicative range: Under $50K (~₹15L–₹40L). Optimised for focused MVP delivery; careful scope management will be essential.";
            case "RANGE_50K_200K"  -> "Indicative range: $50K–$200K (~₹40L–₹1.6Cr). Supports a well-rounded product with primary integrations and QA.";
            case "RANGE_200K_500K" -> "Indicative range: $200K–$500K (~₹1.6Cr–₹4Cr). Enables full-featured build with performance hardening, security audit and hypercare.";
            case "OVER_500K"       -> "Indicative range: $500K+ (~₹4Cr+). Appropriate for enterprise-grade architecture with dedicated team, SLAs and extended support.";
            default                 -> "Budget to be discussed in the discovery session.";
        };
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Utilities
    // ─────────────────────────────────────────────────────────────────────────

    private String generateId() {
        return "BPR-" + Long.toHexString(System.currentTimeMillis()).toUpperCase().substring(4);
    }

    private String truncate(String text, int maxLen) {
        if (text == null) return "";
        return text.length() <= maxLen ? text : text.substring(0, maxLen) + "…";
    }
}

