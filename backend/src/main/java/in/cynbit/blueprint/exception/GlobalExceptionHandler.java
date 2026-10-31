package in.cynbit.blueprint.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

/**
 * Centralised exception handler for the Blueprint Studio API.
 *
 * <p>Transforms validation and runtime exceptions into structured JSON error
 * responses — consistent shape regardless of which layer threw the error.</p>
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    // ── Bean Validation failures (400) ────────────────────────────────────────

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiError> handleValidationErrors(MethodArgumentNotValidException ex) {
        Map<String, String> fieldErrors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach(error -> {
            String field = error instanceof FieldError fe ? fe.getField() : error.getObjectName();
            fieldErrors.put(field, error.getDefaultMessage());
        });
        ApiError apiError = new ApiError(
                HttpStatus.BAD_REQUEST.value(),
                "Validation failed — please check the highlighted fields",
                fieldErrors,
                LocalDateTime.now()
        );
        return ResponseEntity.badRequest().body(apiError);
    }

    // ── Unexpected runtime errors (500) ───────────────────────────────────────

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiError> handleGenericError(Exception ex) {
        ApiError apiError = new ApiError(
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                "An unexpected error occurred. Please try again or contact support@cynbit.in",
                null,
                LocalDateTime.now()
        );
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(apiError);
    }

    // ── Response shape ────────────────────────────────────────────────────────

    public record ApiError(
            int status,
            String message,
            Map<String, String> fieldErrors,
            LocalDateTime timestamp
    ) {}
}

