# Build the JAR file with Maven
FROM maven:3.8.4-openjdk-17 AS build
RUN mkdir -p /java_server
WORKDIR /java_server
COPY pom.xml /java_server
COPY src /java_server/src
RUN mvn -f pom.xml clean package -DskipTests

# Use the JAR file to compile the project
FROM openjdk:17-jdk-slim
RUN mkdir -p /java_server
WORKDIR /java_server
COPY --from=build java_server/target/java_server-0.0.1-SNAPSHOT.jar java_server-0.0.1-SNAPSHOT.jar
EXPOSE 8082
ENTRYPOINT ["java","-jar","java_server-0.0.1-SNAPSHOT.jar"]
