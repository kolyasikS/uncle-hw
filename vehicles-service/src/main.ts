import cors from "cors";
import express from "express";
import { initializeContainers } from "@/application/containers/index.js";
import { VehicleContainer } from "@/application/containers/vehicle.container.ts";
import { errorHandler } from "@/domain/errors/handlers/global-error.handler.js";
import { connectToDB } from "@/infrastructure/config/database.js";
import { connectRabbitMQ } from "@/infrastructure/config/rabbitmq.js";
import vehicleRoute from "@/presentation/controllers/vehicle.controller.js";

const PORT = 3002;

async function bootstrap() {
  await connectToDB();
  await connectRabbitMQ();
  await initializeContainers();

  const app = express();
  app.use(
    cors({
      origin: "http://localhost:3000",
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    }),
  );
  app.use(express.json());

  // connect routes
  app.use("/vehicles", vehicleRoute);

  // connect error handlers
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

bootstrap();
