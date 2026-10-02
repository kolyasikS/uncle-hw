import { Types } from "mongoose";
import type {
  CreateVehicleDto,
  UpdateVehicleDto,
} from "@/application/dto/vehicle.dto.js";
import { Vehicle } from "@/domain/entities/vehicle.entity.js";
import {
  VehicleDeleteDBError,
  VehicleNotFoundError,
  VehicleUpdateDBError,
  VehicleUploadError,
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

  async getByAdminId(adminId: string): Promise<Vehicle[]> {
    return await this.vehicleRepository.getByAdminId(adminId);
  }

  async getAll(): Promise<Vehicle[]> {
    return await this.vehicleRepository.getAll();
  }

  async getById(id: string): Promise<Vehicle> {
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

  async uploadPhotos(vehicleId: string, photoFiles: Express.Multer.File[]) {
    const vehicle = await this.vehicleRepository.getById(vehicleId);

    if (!vehicle) {
      throw new VehicleNotFoundError(vehicleId);
    }

    const files = photoFiles;
    if (!files || files.length === 0) {
      throw new VehicleUploadError();
    }

    const photoPaths = photoFiles.map((f) => `/uploads/photos/${f.filename}`);
    const newPhotos = vehicle.photos
      ? [...vehicle.photos, ...photoPaths]
      : photoPaths;

    const updatedVehicle = Vehicle.update(vehicle, {
      make: vehicle.make,
      model: vehicle.model,
      photos: newPhotos,
    });

    const updatedEntityVehicle =
      await this.vehicleRepository.update(updatedVehicle);

    if (!updatedEntityVehicle) {
      throw new VehicleNotFoundError(vehicleId);
    }

    return updatedEntityVehicle;
  }
}
