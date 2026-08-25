import type {
  CreateVehicleDto,
  UpdateVehicleDto,
} from "@/application/dto/vehicle.dto.js";
import { Vehicle } from "@/domain/entities/vehicle.entity.js";
import {
  VehicleDeleteDBError,
  VehicleNotFoundError,
  VehicleUpdateDBError,
} from "@/domain/errors/vehicle.errors.js";
import type { VehicleRepository } from "@/domain/interfaces/vehicle.interface.js";

export class VehicleService {
  constructor(private readonly vehicleRepository: VehicleRepository) {}

  async create(createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
    const newVehicle = Vehicle.create(createVehicleDto);
    return await this.vehicleRepository.create(newVehicle);
  }

  async delete(id: string): Promise<Vehicle> {
    const vehicle = await this.vehicleRepository.getById(id);

    if (!vehicle) {
      throw new VehicleNotFoundError(id);
    }

    const deletedEntityVehicle = await this.vehicleRepository.delete(id);

    if (!deletedEntityVehicle) {
      throw new VehicleDeleteDBError(id);
    }

    return deletedEntityVehicle;
  }

  async getAll(): Promise<Vehicle[]> {
    return await this.vehicleRepository.getAll();
  }

  async getById(id: string): Promise<Vehicle | null> {
    const vehicle = await this.vehicleRepository.getById(id);

    if (!vehicle) {
      throw new VehicleNotFoundError(id);
    }

    return vehicle;
  }

  async update(
    id: string,
    updateVehicleDto: UpdateVehicleDto,
  ): Promise<Vehicle> {
    const vehicle = await this.vehicleRepository.getById(id);

    if (!vehicle) {
      throw new VehicleNotFoundError(id);
    }

    const updatedVehicle = Vehicle.update(vehicle, {
      make: updateVehicleDto.make,
      model: updateVehicleDto.model,
      year: updateVehicleDto.year,
    });

    const updatedEntityVehicle =
      await this.vehicleRepository.update(updatedVehicle);

    if (!updatedEntityVehicle) {
      throw new VehicleUpdateDBError(updatedVehicle.id);
    }

    return updatedEntityVehicle;
  }
}
