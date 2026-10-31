package in.cynbit.blueprint.service;

import in.cynbit.blueprint.dto.BlueprintRequestDTO;
import in.cynbit.blueprint.dto.BlueprintResponseDTO;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Unit tests for {@link BlueprintGenerationService}.
 *
 * <p>Tests cover the deterministic recommendation logic for each service type,
 * complexity tier and key helper methods — ensuring output quality without
 * requiring Spring context (plain JUnit 5 + AssertJ).</p>
 */
class BlueprintGenerationServiceTest {

    private BlueprintGenerationService service;

    @BeforeEach
    void setUp() {
        service = new BlueprintGenerationService();
    }

    // ── generate() smoke test ─────────────────────────────────────────────────

    @Test
    @DisplayName("generate() returns a fully-populated response for a valid AI Automation request")
    void generate_aiAutomation_returnsFullBlueprint() {
        BlueprintRequestDTO req = buildRequest("AI_AUTOMATION", "MEDIUM", "THREE_TO_SIX_MONTHS", "RANGE_50K_200K");

        BlueprintResponseDTO result = service.generate(req);

        assertThat(result.getBlueprintId()).startsWith("BPR-");
        assertThat(result.getGeneratedAt()).isNotNull();
        assertThat(result.getProjectTitle()).contains("Autonomous AI");
        assertThat(result.getExecutiveSummary()).isNotBlank();
        assertThat(result.getMvpFeatures()).isNotEmpty();
        assertThat(result.getRecommendedStack()).isNotNull();
        assertThat(result.getImplementationRoadmap()).hasSizeGreaterThanOrEqualTo(2);
        assertThat(result.getAssumptions()).isNotEmpty();
        assertThat(result.getNextSteps()).hasSize(4);
        assertThat(result.getDisclaimer()).isNotBlank();
    }

    @Test
    @DisplayName("generate() returns correct service label for Software Development")
    void generate_softwareDev_correctServiceLabel() {
        BlueprintRequestDTO req = buildRequest("SOFTWARE_DEVELOPMENT", "LARGE", "SIX_TO_TWELVE_MONTHS", "RANGE_200K_500K");
        BlueprintResponseDTO result = service.generate(req);
        assertThat(result.getServiceCategory()).isEqualTo("Custom Software Development");
    }

    // ── Phase count varies with complexity ────────────────────────────────────

    @Test
    @DisplayName("Enterprise Software Development produces 4 roadmap phases")
    void roadmap_enterpriseSoftwareDev_hasFourPhases() {
        BlueprintRequestDTO req = buildRequest("SOFTWARE_DEVELOPMENT", "ENTERPRISE", "OVER_TWELVE_MONTHS", "OVER_500K");
        BlueprintResponseDTO result = service.generate(req);
        assertThat(result.getImplementationRoadmap()).hasSize(4);
    }

    @Test
    @DisplayName("Small AI Automation produces 2 roadmap phases")
    void roadmap_smallAiAutomation_hasTwoPhases() {
        BlueprintRequestDTO req = buildRequest("AI_AUTOMATION", "SMALL", "UNDER_3_MONTHS", "UNDER_50K");
        BlueprintResponseDTO result = service.generate(req);
        assertThat(result.getImplementationRoadmap()).hasSize(2);
    }

    // ── Tech stack layers are present ─────────────────────────────────────────

    @ParameterizedTest(name = "Tech stack has layers for {0}")
    @CsvSource({
        "AI_AUTOMATION,MEDIUM",
        "SOFTWARE_DEVELOPMENT,SMALL",
        "CLOUD_INFRASTRUCTURE,ENTERPRISE",
        "DIGITAL_MARKETING,MEDIUM"
    })
    void techStack_allServiceTypes_hasLayers(String serviceType, String complexity) {
        BlueprintRequestDTO req = buildRequest(serviceType, complexity, "THREE_TO_SIX_MONTHS", "RANGE_50K_200K");
        BlueprintResponseDTO result = service.generate(req);
        assertThat(result.getRecommendedStack().layers()).isNotEmpty();
        assertThat(result.getRecommendedStack().cloudProviders()).isNotEmpty();
    }

    // ── Project title includes company name ───────────────────────────────────

    @Test
    @DisplayName("buildProjectTitle() includes company name when provided")
    void buildProjectTitle_withCompanyName_includesItInTitle() {
        BlueprintRequestDTO req = buildRequest("CLOUD_INFRASTRUCTURE", "LARGE", "SIX_TO_TWELVE_MONTHS", "RANGE_200K_500K");
        req.setCompanyName("Acme Corp");
        String title = service.buildProjectTitle(req);
        assertThat(title).startsWith("Acme Corp: ");
    }

    @Test
    @DisplayName("buildProjectTitle() handles null company name gracefully")
    void buildProjectTitle_withNullCompany_noPrefix() {
        BlueprintRequestDTO req = buildRequest("DIGITAL_MARKETING", "SMALL", "UNDER_3_MONTHS", "UNDER_50K");
        req.setCompanyName(null);
        String title = service.buildProjectTitle(req);
        assertThat(title).doesNotContain("null");
        assertThat(title).isNotBlank();
    }

    // ── resolveTimeline helper ────────────────────────────────────────────────

    @ParameterizedTest(name = "resolveTimeline({0}) is not blank")
    @CsvSource({
        "UNDER_3_MONTHS,SMALL",
        "THREE_TO_SIX_MONTHS,MEDIUM",
        "SIX_TO_TWELVE_MONTHS,LARGE",
        "OVER_TWELVE_MONTHS,ENTERPRISE"
    })
    void resolveTimeline_allValues_returnsNonBlankString(String timeline, String complexity) {
        String result = service.resolveTimeline(timeline, complexity);
        assertThat(result).isNotBlank();
    }

    // ── Executive summary references key capabilities ─────────────────────────

    @Test
    @DisplayName("buildExecutiveSummary() mentions selected capabilities")
    void buildExecutiveSummary_includesCapabilities() {
        BlueprintRequestDTO req = buildRequest("AI_AUTOMATION", "MEDIUM", "THREE_TO_SIX_MONTHS", "RANGE_50K_200K");
        req.setKeyCapabilities(List.of("Analytics", "Predictive Modelling"));
        String summary = service.buildExecutiveSummary(req);
        assertThat(summary).contains("Analytics");
        assertThat(summary).contains("Predictive Modelling");
    }

    // ── Assumptions include service-specific items ────────────────────────────

    @Test
    @DisplayName("Cloud infra assumptions include cloud-specific notes")
    void buildAssumptions_cloudInfra_includesCloudSpecificAssumption() {
        BlueprintRequestDTO req = buildRequest("CLOUD_INFRASTRUCTURE", "LARGE", "SIX_TO_TWELVE_MONTHS", "RANGE_200K_500K");
        List<String> assumptions = service.buildAssumptions(req);
        assertThat(assumptions).anyMatch(a -> a.toLowerCase().contains("containeris"));
    }

    @Test
    @DisplayName("Enterprise assumptions include dedicated team note")
    void buildAssumptions_enterprise_includesDedicatedTeamNote() {
        BlueprintRequestDTO req = buildRequest("SOFTWARE_DEVELOPMENT", "ENTERPRISE", "OVER_TWELVE_MONTHS", "OVER_500K");
        List<String> assumptions = service.buildAssumptions(req);
        assertThat(assumptions).anyMatch(a -> a.toLowerCase().contains("project manager"));
    }

    // ── Executive summary personalization & formatting tests ─────────────────

    @Test
    @DisplayName("buildExecutiveSummary() formats company name without stray hyphens")
    void buildExecutiveSummary_withCompanyName_noStrayHyphen() {
        BlueprintRequestDTO req = buildRequest("SOFTWARE_DEVELOPMENT", "MEDIUM", "THREE_TO_SIX_MONTHS", "RANGE_50K_200K");
        req.setCompanyName("Apex Logistics");
        req.setContactName("Sarah Connor");

        String summary = service.buildExecutiveSummary(req);

        assertThat(summary).contains("for Apex Logistics, focused on delivering");
        assertThat(summary).doesNotContain("Apex Logistics - ");
    }

    @Test
    @DisplayName("buildExecutiveSummary() falls back to contact team when company is omitted")
    void buildExecutiveSummary_withOnlyContactName_usesContactTeam() {
        BlueprintRequestDTO req = buildRequest("AI_AUTOMATION", "SMALL", "UNDER_3_MONTHS", "UNDER_50K");
        req.setCompanyName(null);
        req.setContactName("Rahul Verma");

        String summary = service.buildExecutiveSummary(req);

        assertThat(summary).contains("for Rahul Verma's team, focused on delivering");
        assertThat(summary).doesNotContain("null");
    }

    @Test
    @DisplayName("buildExecutiveSummary() falls back to 'your organisation' when company and contact are omitted")
    void buildExecutiveSummary_withoutCompanyOrContact_usesYourOrganisation() {
        BlueprintRequestDTO req = buildRequest("AI_AUTOMATION", "SMALL", "UNDER_3_MONTHS", "UNDER_50K");
        req.setCompanyName(null);
        req.setContactName(null);

        String summary = service.buildExecutiveSummary(req);

        assertThat(summary).contains("for your organisation, focused on delivering");
    }

    // ── Budget note resolver tests (dual currency representation) ─────────────

    @ParameterizedTest(name = "resolveBudgetNote({0}) contains {1}")
    @CsvSource({
        "UNDER_50K,Under $50K",
        "RANGE_50K_200K,$50K–$200K",
        "RANGE_200K_500K,$200K–$500K",
        "OVER_500K,$500K+"
    })
    void resolveBudgetNote_allTiers_containsExpectedLabels(String tier, String expectedSnippet) {
        String note = service.resolveBudgetNote(tier);
        assertThat(note).contains(expectedSnippet);
        assertThat(note).contains("₹");
    }

    // ── Service type distinctiveness tests ───────────────────────────────────

    @Test
    @DisplayName("All 4 service types produce distinct, appropriately targeted blueprints")
    void allServiceTypes_produceDistinctBlueprints() {
        BlueprintResponseDTO ai = service.generate(buildRequest("AI_AUTOMATION", "MEDIUM", "THREE_TO_SIX_MONTHS", "RANGE_50K_200K"));
        BlueprintResponseDTO soft = service.generate(buildRequest("SOFTWARE_DEVELOPMENT", "MEDIUM", "THREE_TO_SIX_MONTHS", "RANGE_50K_200K"));
        BlueprintResponseDTO cloud = service.generate(buildRequest("CLOUD_INFRASTRUCTURE", "MEDIUM", "THREE_TO_SIX_MONTHS", "RANGE_50K_200K"));
        BlueprintResponseDTO mktg = service.generate(buildRequest("DIGITAL_MARKETING", "MEDIUM", "THREE_TO_SIX_MONTHS", "RANGE_50K_200K"));

        // Titles are distinct
        assertThat(ai.getProjectTitle()).contains("Autonomous AI");
        assertThat(soft.getProjectTitle()).contains("Custom Software Development");
        assertThat(cloud.getProjectTitle()).contains("Cloud Architecture");
        assertThat(mktg.getProjectTitle()).contains("Digital Growth & SEO");

        // Service categories are distinct
        assertThat(ai.getServiceCategory()).isEqualTo("AI Automation & Autonomous Agents");
        assertThat(soft.getServiceCategory()).isEqualTo("Custom Software Development");
        assertThat(cloud.getServiceCategory()).isEqualTo("Cloud Infrastructure & Architecture");
        assertThat(mktg.getServiceCategory()).isEqualTo("Digital Marketing & Technical SEO");

        // Stack layers reflect the service domain
        assertThat(ai.getRecommendedStack().layers()).anyMatch(l -> l.layer().contains("Orchestration") || l.layer().contains("Agent"));
        assertThat(soft.getRecommendedStack().layers()).anyMatch(l -> l.layer().contains("Backend") || l.layer().contains("Database"));
        assertThat(cloud.getRecommendedStack().layers()).anyMatch(l -> l.layer().contains("Infrastructure as Code"));
        assertThat(mktg.getRecommendedStack().layers()).anyMatch(l -> l.layer().contains("SEO") || l.layer().contains("Web Platform"));

        // Disclaimers are clearly advisory
        assertThat(ai.getDisclaimer()).contains("preliminary advisory document");
        assertThat(ai.getDisclaimer()).contains("not contracted or pre-built deliverables");
    }

    // ── Helper ────────────────────────────────────────────────────────────────

    private BlueprintRequestDTO buildRequest(String serviceType, String complexity, String timeline, String budget) {
        BlueprintRequestDTO req = new BlueprintRequestDTO();
        req.setServiceType(serviceType);
        req.setBusinessGoals("We want to modernise our operations, reduce manual effort and scale efficiently.");
        req.setKeyCapabilities(List.of("Automation", "Analytics", "Reporting"));
        req.setComplexity(complexity);
        req.setTimeline(timeline);
        req.setBudgetRange(budget);
        req.setContactName("Jane Smith");
        req.setCompanyName("Test Corp");
        return req;
    }
}

