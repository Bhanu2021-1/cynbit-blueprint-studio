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

