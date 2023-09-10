FROM maven:3.8-openjdk-18-slim as builder
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

FROM maven:3.8-openjdk-18-slim
COPY --from=builder /app/target/*.jar /app.jar
CMD [ "java","-jar", "app.jar" ]

