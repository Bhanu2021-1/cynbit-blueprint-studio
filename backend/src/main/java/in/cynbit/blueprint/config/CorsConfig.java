package in.cynbit.blueprint.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Arrays;

/**
 * CORS configuration for Cynbit Blueprint Studio API.
 * Reads allowed origins from app.cors.allowed-origins or APP_CORS_ALLOWED_ORIGINS environment variable.
 * Supports exact domains, wildcards, and vercel preview domains (*.vercel.app).
 */
@Configuration
public class CorsConfig {

    @Value("${app.cors.allowed-origins:${APP_CORS_ALLOWED_ORIGINS:http://localhost:5173,http://localhost:3000}}")
    private String[] allowedOrigins;

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                String[] trimmedOrigins = Arrays.stream(allowedOrigins)
                        .map(String::trim)
                        .filter(s -> !s.isEmpty())
                        .toArray(String[]::new);

                boolean hasGlobalWildcard = Arrays.asList(trimmedOrigins).contains("*");

                CorsRegistration registration = registry.addMapping("/api/**")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(false)
                        .maxAge(3600);

                if (hasGlobalWildcard) {
                    registration.allowedOriginPatterns("*");
                } else {
                    registration.allowedOriginPatterns(trimmedOrigins);
                }
            }
        };
    }
}
