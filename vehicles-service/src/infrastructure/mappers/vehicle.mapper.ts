import express from "express";
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
      adminId: vehicle.admin_id,
      photos: vehicle.photos,
    };
  }

  static toPersistence(vehicle: Vehicle) {
    return {
      make: vehicle.make,
      year: vehicle.year,
      model: vehicle.model,
      user_id: vehicle.userId,
      admin_id: vehicle.adminId,
      photos: vehicle.photos,
    };
  }

  static toHttp(req: express.Request, res: express.Response, vehicle: Vehicle) {
    const host = `${req.protocol}://${req.get("host")}`;

    // Map stored relative paths to absolute URLs
    const photosWithFullUrl = vehicle.photos?.map(
      (photoPath) => `${host}/persistance${photoPath}`,
    );

    return {
      id: vehicle.id,
      make: vehicle.make,
      year: vehicle.year,
      model: vehicle.model,
      userId: vehicle.userId,
      adminId: vehicle.adminId,
      photos: photosWithFullUrl,
    };
  }
}
