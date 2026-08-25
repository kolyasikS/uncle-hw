import { UserCreatedHandler } from "@/application/handlers/UserCreatedHandler.js";
import type { VehicleService } from "@/application/services/vehicle.service.js";
import { rabbitMQ } from "@/infrastructure/config/rabbitmq.js";
import { UserCreatedConsumer } from "@/infrastructure/message-broker/consumers/user-created.consumer.js";

export class RabbitmqContainer {
  static async initialize(vehicleService: VehicleService): Promise<void> {
    const userCreatedHandler = new UserCreatedHandler(vehicleService);
    const userCreatedConsumer = new UserCreatedConsumer(
      rabbitMQ,
      userCreatedHandler,
    );

    await userCreatedConsumer.start();
  }
}
