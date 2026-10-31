package in.cynbit.blueprint.dto;

import jakarta.validation.constraints.*;
import java.util.List;

/**
 * Inbound DTO carrying all wizard inputs submitted by the visitor.
 * Validated via Jakarta Bean Validation before reaching the service layer.
 */
public class BlueprintRequestDTO {

    /** One of: AI_AUTOMATION, SOFTWARE_DEVELOPMENT, CLOUD_INFRASTRUCTURE, DIGITAL_MARKETING */
    @NotBlank(message = "Service type is required")
    private String serviceType;

    /** Free-text description of business goals (10–2000 chars) */
    @NotBlank(message = "Business goals description is required")
    @Size(min = 10, max = 2000, message = "Business goals must be between 10 and 2000 characters")
    private String businessGoals;

    /** Key capabilities the visitor selected, e.g. ["Automation", "Analytics"] */
    @NotNull(message = "Key capabilities list is required")
    @Size(min = 1, message = "Select at least one key capability")
    private List<String> keyCapabilities;

    /** One of: SMALL, MEDIUM, LARGE, ENTERPRISE */
    @NotBlank(message = "Project complexity is required")
    private String complexity;

    /** One of: UNDER_3_MONTHS, THREE_TO_SIX_MONTHS, SIX_TO_TWELVE_MONTHS, OVER_TWELVE_MONTHS */
    @NotBlank(message = "Timeline preference is required")
    private String timeline;

    /** One of: UNDER_50K, RANGE_50K_200K, RANGE_200K_500K, OVER_500K (USD / INR equivalent) */
    @NotBlank(message = "Budget range is required")
    private String budgetRange;

    /** Optional: visitor's name */
    private String contactName;

    /** Optional: visitor's company */
    private String companyName;

    // ── Getters & Setters ─────────────────────────────────────────────────────

    public String getServiceType() { return serviceType; }
    public void setServiceType(String serviceType) { this.serviceType = serviceType; }

    public String getBusinessGoals() { return businessGoals; }
    public void setBusinessGoals(String businessGoals) { this.businessGoals = businessGoals; }

    public List<String> getKeyCapabilities() { return keyCapabilities; }
    public void setKeyCapabilities(List<String> keyCapabilities) { this.keyCapabilities = keyCapabilities; }

    public String getComplexity() { return complexity; }
    public void setComplexity(String complexity) { this.complexity = complexity; }

    public String getTimeline() { return timeline; }
    public void setTimeline(String timeline) { this.timeline = timeline; }

    public String getBudgetRange() { return budgetRange; }
    public void setBudgetRange(String budgetRange) { this.budgetRange = budgetRange; }

    public String getContactName() { return contactName; }
    public void setContactName(String contactName) { this.contactName = contactName; }

    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }
}

