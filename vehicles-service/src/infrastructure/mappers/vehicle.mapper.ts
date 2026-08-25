import type { HydratedDocument } from "mongoose";
import type { Vehicle } from "@/domain/entities/vehicle.entity.js";
import type { VehicleDocument } from "@/infrastructure/mongo/models/vehicle.model.js";

export class VehicleMapper {
  static toDomain(vehicle: HydratedDocument<VehicleDocument>): Vehicle {
    return {
      id: vehicle._id.toString(),
      make: vehicle.make,
      year: vehicle.year,
      model: vehicle.model,
      userId: vehicle.user_id,
    };
  }

  static toPersistence(vehicle: Vehicle) {
    return {
      make: vehicle.make,
      year: vehicle.year,
      model: vehicle.model,
      user_id: vehicle.userId,
    };
  }
}
