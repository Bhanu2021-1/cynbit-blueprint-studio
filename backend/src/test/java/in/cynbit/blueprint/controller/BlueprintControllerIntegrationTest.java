package in.cynbit.blueprint.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import in.cynbit.blueprint.dto.BlueprintRequestDTO;
import in.cynbit.blueprint.service.BlueprintGenerationService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration test for {@link BlueprintController} and validation handling.
 * Tests REST API contract, JSON serialization, and Spring validation pipeline.
 */
@WebMvcTest(BlueprintController.class)
@Import(BlueprintGenerationService.class)
class BlueprintControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    // ── Health Endpoint ───────────────────────────────────────────────────────

    @Test
    @DisplayName("GET /api/health returns 200 with UP status")
    void healthCheck_returns200() throws Exception {
        mockMvc.perform(get("/api/health"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status", is("UP")))
                .andExpect(jsonPath("$.service", is("Cynbit Blueprint Studio API")))
                .andExpect(jsonPath("$.version", is("1.0.0")));
    }

    // ── Service Types Distinctiveness via REST API ───────────────────────────

    @Test
    @DisplayName("POST /api/blueprints for AI_AUTOMATION returns valid blueprint")
    void generateBlueprint_aiAutomation_returns200() throws Exception {
        BlueprintRequestDTO req = sampleRequest("AI_AUTOMATION", "MEDIUM", "UNDER_50K");

        mockMvc.perform(post("/api/blueprints")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.blueprintId", startsWith("BPR-")))
                .andExpect(jsonPath("$.serviceCategory", is("AI Automation & Autonomous Agents")))
                .andExpect(jsonPath("$.projectTitle", containsString("Autonomous AI Workflow Platform")))
                .andExpect(jsonPath("$.indicativeBudgetNote", containsString("Under $50K (~₹15L–₹40L)")))
                .andExpect(jsonPath("$.executiveSummary", not(containsString("Apex Logistics - "))))
                .andExpect(jsonPath("$.executiveSummary", containsString("for Apex Logistics, focused on delivering")))
                .andExpect(jsonPath("$.mvpFeatures", hasSize(greaterThanOrEqualTo(2))))
                .andExpect(jsonPath("$.disclaimer", containsString("preliminary advisory document")));
    }

    @Test
    @DisplayName("POST /api/blueprints for SOFTWARE_DEVELOPMENT returns valid blueprint")
    void generateBlueprint_softwareDev_returns200() throws Exception {
        BlueprintRequestDTO req = sampleRequest("SOFTWARE_DEVELOPMENT", "LARGE", "RANGE_50K_200K");

        mockMvc.perform(post("/api/blueprints")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.blueprintId", startsWith("BPR-")))
                .andExpect(jsonPath("$.serviceCategory", is("Custom Software Development")))
                .andExpect(jsonPath("$.projectTitle", containsString("Custom Software Development Blueprint")))
                .andExpect(jsonPath("$.indicativeBudgetNote", containsString("$50K–$200K (~₹40L–₹1.6Cr)")))
                .andExpect(jsonPath("$.mvpFeatures", hasSize(greaterThanOrEqualTo(2))));
    }

    @Test
    @DisplayName("POST /api/blueprints for CLOUD_INFRASTRUCTURE returns valid blueprint")
    void generateBlueprint_cloudInfra_returns200() throws Exception {
        BlueprintRequestDTO req = sampleRequest("CLOUD_INFRASTRUCTURE", "ENTERPRISE", "RANGE_200K_500K");

        mockMvc.perform(post("/api/blueprints")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.blueprintId", startsWith("BPR-")))
                .andExpect(jsonPath("$.serviceCategory", is("Cloud Infrastructure & Architecture")))
                .andExpect(jsonPath("$.projectTitle", containsString("Cloud Architecture & Migration Blueprint")))
                .andExpect(jsonPath("$.indicativeBudgetNote", containsString("$200K–$500K (~₹1.6Cr–₹4Cr)")))
                .andExpect(jsonPath("$.recommendedStack.layers[?(@.layer == 'Infrastructure as Code')]", notNullValue()));
    }

    @Test
    @DisplayName("POST /api/blueprints for DIGITAL_MARKETING returns valid blueprint")
    void generateBlueprint_digitalMarketing_returns200() throws Exception {
        BlueprintRequestDTO req = sampleRequest("DIGITAL_MARKETING", "SMALL", "OVER_500K");

        mockMvc.perform(post("/api/blueprints")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.blueprintId", startsWith("BPR-")))
                .andExpect(jsonPath("$.serviceCategory", is("Digital Marketing & Technical SEO")))
                .andExpect(jsonPath("$.projectTitle", containsString("Digital Growth & SEO Strategy Blueprint")))
                .andExpect(jsonPath("$.indicativeBudgetNote", containsString("$500K+ (~₹4Cr+)")));
    }

    // ── Validation Failure Tests ──────────────────────────────────────────────

    @Test
    @DisplayName("POST /api/blueprints with missing required fields returns 400 Bad Request")
    void generateBlueprint_emptyPayload_returns400WithErrors() throws Exception {
        BlueprintRequestDTO bad = new BlueprintRequestDTO();

        mockMvc.perform(post("/api/blueprints")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(bad)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.fieldErrors.serviceType", notNullValue()))
                .andExpect(jsonPath("$.fieldErrors.businessGoals", notNullValue()))
                .andExpect(jsonPath("$.fieldErrors.keyCapabilities", notNullValue()))
                .andExpect(jsonPath("$.fieldErrors.complexity", notNullValue()))
                .andExpect(jsonPath("$.fieldErrors.timeline", notNullValue()))
                .andExpect(jsonPath("$.fieldErrors.budgetRange", notNullValue()));
    }

    @Test
    @DisplayName("POST /api/blueprints with short businessGoals (<10 chars) returns 400 Bad Request")
    void generateBlueprint_shortGoals_returns400() throws Exception {
        BlueprintRequestDTO req = sampleRequest("AI_AUTOMATION", "SMALL", "UNDER_50K");
        req.setBusinessGoals("Too short");

        mockMvc.perform(post("/api/blueprints")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.fieldErrors.businessGoals", containsString("between 10 and 2000")));
    }

    // ── Helper ────────────────────────────────────────────────────────────────

    private BlueprintRequestDTO sampleRequest(String serviceType, String complexity, String budget) {
        BlueprintRequestDTO req = new BlueprintRequestDTO();
        req.setServiceType(serviceType);
        req.setBusinessGoals("Automate operations and build scalable enterprise architectures for our clients.");
        req.setKeyCapabilities(List.of("Automation", "Analytics", "Security"));
        req.setComplexity(complexity);
        req.setTimeline("THREE_TO_SIX_MONTHS");
        req.setBudgetRange(budget);
        req.setContactName("Sarah Connor");
        req.setCompanyName("Apex Logistics");
        return req;
    }
}
