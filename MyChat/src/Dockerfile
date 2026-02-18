# ====== Stage 1: Build the JAR ======
FROM maven:3.9.6-eclipse-temurin-23 AS build
WORKDIR /app

# Copy pom.xml and download dependencies
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy the full source code
COPY src ./src

# Package the application
RUN mvn clean package -DskipTests


# ====== Stage 2: Run the JAR with Infisical ======
FROM eclipse-temurin:23-jdk
WORKDIR /app

# Install curl + Infisical CLI
RUN apt-get update && apt-get install -y curl \
    && curl -1sLf https://dl.cloudsmith.io/public/infisical/infisical-cli/setup.deb.sh | bash \
    && apt-get install -y infisical \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Copy built jar
COPY --from=build /app/target/*.jar app.jar

# Render provides PORT dynamically
ENV PORT=8080
EXPOSE 8080

# Start app via Infisical
CMD ["sh", "-c", "infisical run -- java -jar app.jar"]
