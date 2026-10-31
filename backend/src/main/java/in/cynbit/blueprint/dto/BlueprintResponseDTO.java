package in.cynbit.blueprint.dto;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Outbound DTO returned to the React frontend after blueprint generation.
 * All fields are advisory and clearly labelled as preliminary estimates.
 */
public class BlueprintResponseDTO {

    private String blueprintId;
    private LocalDateTime generatedAt;

    // ── Executive Summary ────────────────────────────────────────────────────
    private String projectTitle;
    private String executiveSummary;
    private String serviceCategory;
    private String complexityLabel;

    // ── MVP Features ─────────────────────────────────────────────────────────
    private List<FeatureGroup> mvpFeatures;

    // ── Technology Stack ─────────────────────────────────────────────────────
    private TechStack recommendedStack;

    // ── Roadmap ──────────────────────────────────────────────────────────────
    private List<Phase> implementationRoadmap;

    // ── Estimates (indicative, not quotes) ───────────────────────────────────
    private String indicativeTimelineRange;
    private String indicativeBudgetNote;

    // ── Assumptions & Next Steps ─────────────────────────────────────────────
    private List<String> assumptions;
    private List<NextStep> nextSteps;

    // ── Disclaimer ───────────────────────────────────────────────────────────
    private String disclaimer;

    // ═══════════════════════════════════════════════════════════════════════
    // Nested record types
    // ═══════════════════════════════════════════════════════════════════════

    public record FeatureGroup(String category, List<Feature> features) {}

    public record Feature(String name, String description, String priority) {}

    public record TechStack(
            List<StackLayer> layers,
            List<String> cloudProviders,
            List<String> devOpsTools
    ) {}

    public record StackLayer(String layer, List<String> technologies, String rationale) {}

    public record Phase(
            int phaseNumber,
            String phaseName,
            String description,
            List<String> deliverables,
            String estimatedDuration
    ) {}

    public record NextStep(int order, String action, String detail) {}

    // ── Getters & Setters ─────────────────────────────────────────────────────

    public String getBlueprintId() { return blueprintId; }
    public void setBlueprintId(String blueprintId) { this.blueprintId = blueprintId; }

    public LocalDateTime getGeneratedAt() { return generatedAt; }
    public void setGeneratedAt(LocalDateTime generatedAt) { this.generatedAt = generatedAt; }

    public String getProjectTitle() { return projectTitle; }
    public void setProjectTitle(String projectTitle) { this.projectTitle = projectTitle; }

    public String getExecutiveSummary() { return executiveSummary; }
    public void setExecutiveSummary(String executiveSummary) { this.executiveSummary = executiveSummary; }

    public String getServiceCategory() { return serviceCategory; }
    public void setServiceCategory(String serviceCategory) { this.serviceCategory = serviceCategory; }

    public String getComplexityLabel() { return complexityLabel; }
    public void setComplexityLabel(String complexityLabel) { this.complexityLabel = complexityLabel; }

    public List<FeatureGroup> getMvpFeatures() { return mvpFeatures; }
    public void setMvpFeatures(List<FeatureGroup> mvpFeatures) { this.mvpFeatures = mvpFeatures; }

    public TechStack getRecommendedStack() { return recommendedStack; }
    public void setRecommendedStack(TechStack recommendedStack) { this.recommendedStack = recommendedStack; }

    public List<Phase> getImplementationRoadmap() { return implementationRoadmap; }
    public void setImplementationRoadmap(List<Phase> implementationRoadmap) { this.implementationRoadmap = implementationRoadmap; }

    public String getIndicativeTimelineRange() { return indicativeTimelineRange; }
    public void setIndicativeTimelineRange(String indicativeTimelineRange) { this.indicativeTimelineRange = indicativeTimelineRange; }

    public String getIndicativeBudgetNote() { return indicativeBudgetNote; }
    public void setIndicativeBudgetNote(String indicativeBudgetNote) { this.indicativeBudgetNote = indicativeBudgetNote; }

    public List<String> getAssumptions() { return assumptions; }
    public void setAssumptions(List<String> assumptions) { this.assumptions = assumptions; }

    public List<NextStep> getNextSteps() { return nextSteps; }
    public void setNextSteps(List<NextStep> nextSteps) { this.nextSteps = nextSteps; }

    public String getDisclaimer() { return disclaimer; }
    public void setDisclaimer(String disclaimer) { this.disclaimer = disclaimer; }
}

