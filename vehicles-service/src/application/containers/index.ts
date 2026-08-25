import { RabbitmqContainer } from "@/application/containers/rabbitmq.container.js";
import { VehicleContainer } from "@/application/containers/vehicle.container.js";

export async function initializeContainers() {
  await VehicleContainer.initialize();
  await RabbitmqContainer.initialize(VehicleContainer.vehicleService);
}
