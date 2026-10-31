package in.cynbit.blueprint.controller;

import in.cynbit.blueprint.dto.BlueprintRequestDTO;
import in.cynbit.blueprint.dto.BlueprintResponseDTO;
import in.cynbit.blueprint.service.BlueprintGenerationService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * REST controller exposing the Blueprint generation endpoint.
 *
 * <p>POST /api/blueprints — Accepts a validated {@link BlueprintRequestDTO},
 * delegates to {@link BlueprintGenerationService}, and returns a
 * {@link BlueprintResponseDTO} with HTTP 200.</p>
 *
 * <p>Validation errors are handled globally by {@link in.cynbit.blueprint.exception.GlobalExceptionHandler}.</p>
 */
@RestController
@RequestMapping("/api")
public class BlueprintController {

    private final BlueprintGenerationService blueprintService;

    public BlueprintController(BlueprintGenerationService blueprintService) {
        this.blueprintService = blueprintService;
    }

    /**
     * Health-check endpoint — useful for deployment readiness probes.
     */
    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> health() {
        return ResponseEntity.ok(Map.of(
                "status", "UP",
                "service", "Cynbit Blueprint Studio API",
                "version", "1.0.0"
        ));
    }

    /**
     * Generate a project blueprint from the submitted discovery wizard inputs.
     *
     * @param request Validated incoming DTO from the React frontend
     * @return A structured {@link BlueprintResponseDTO}
     */
    @PostMapping("/blueprints")
    public ResponseEntity<BlueprintResponseDTO> generateBlueprint(
            @Valid @RequestBody BlueprintRequestDTO request) {

        BlueprintResponseDTO blueprint = blueprintService.generate(request);
        return ResponseEntity.ok(blueprint);
    }
}

