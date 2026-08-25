import { VehicleService } from "@/application/services/vehicle.service.js";
import { MongoVehicleRepository } from "@/infrastructure/repositories/vehicle.repository.js";

export class VehicleContainer {
  static vehicleService: VehicleService;

  static async initialize(): Promise<void> {
    const vehicleRepository = new MongoVehicleRepository();
    VehicleContainer.vehicleService = new VehicleService(vehicleRepository);
  }
}
