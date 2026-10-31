# syntax=docker/dockerfile:1

# ── Stage 1: Build the Spring Boot application ──
FROM maven:3.9.9-eclipse-temurin-17-alpine AS builder
WORKDIR /workspace

# Cache Maven dependencies
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Build executable fat JAR
COPY src ./src
RUN mvn clean package -DskipTests -B

# ── Stage 2: Lightweight Runtime ──
FROM eclipse-temurin:17-jre-alpine AS runner
WORKDIR /app

# Non-root user for security
RUN addgroup -S cynbit && adduser -S cynbit -G cynbit
USER cynbit:cynbit

COPY --from=builder --chown=cynbit:cynbit /workspace/target/blueprint-studio-api-*.jar app.jar

# Dynamic port binding (Render, Railway, Cloud Run inject $PORT)
ENV PORT=8080
ENV JAVA_OPTS="-XX:+UseContainerSupport -XX:MaxRAMPercentage=75.0"

EXPOSE ${PORT}

ENTRYPOINT ["sh", "-c", "exec java $JAVA_OPTS -jar app.jar --server.port=${PORT}"]
