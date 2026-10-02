import type { Vehicle } from "@/domain/entities/vehicle.entity.js";

export interface VehicleRepository {
  create(vehicle: Vehicle): Promise<Vehicle>;
  getByAdminId(adminId: string): Promise<Vehicle[]>;
  getAll(): Promise<Vehicle[]>;
  getById(id: string): Promise<Vehicle | null>;
  update(vehicle: Vehicle): Promise<Vehicle | null>;
  delete(id: string): Promise<Vehicle | null>;
}
