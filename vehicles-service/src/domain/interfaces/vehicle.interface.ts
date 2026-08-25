import type { Vehicle } from "@/domain/entities/vehicle.entity.js";

export interface VehicleRepository {
  create(user: Vehicle): Promise<Vehicle>;
  getAll(): Promise<Vehicle[]>;
  getById(id: string): Promise<Vehicle | null>;
  update(user: Vehicle): Promise<Vehicle | null>;
  delete(id: string): Promise<Vehicle | null>;
}
