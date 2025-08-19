FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app

# Copy pom and download dependencies first (better caching)
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy source and build
COPY src ./src
RUN mvn clean package -DskipTests

# ===== RUNTIME STAGE =====
FROM eclipse-temurin:17-jdk-jammy
WORKDIR /app

# Copy the fat jar from build stage
COPY --from=build /app/target/*.jar app.jar

# Run as non-root user for security
RUN addgroup --system spring && adduser --system --ingroup spring spring
USER spring:spring

EXPOSE 8080
ENTRYPOINT ["java","-jar","/app/app.jar"]