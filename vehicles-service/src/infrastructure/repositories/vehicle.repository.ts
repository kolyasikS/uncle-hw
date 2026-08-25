import type { Vehicle } from "@/domain/entities/vehicle.entity.js";
import { VehicleNotFoundError } from "@/domain/errors/vehicle.errors.js";
import type { VehicleRepository } from "@/domain/interfaces/vehicle.interface.js";
import { VehicleMapper } from "@/infrastructure/mappers/vehicle.mapper.js";
import { VehicleModel } from "@/infrastructure/mongo/models/vehicle.model.js";

export class MongoVehicleRepository implements VehicleRepository {
  async create(vehicle: Vehicle): Promise<Vehicle> {
    const data = VehicleMapper.toPersistence(vehicle);

    const vehicleModel = new VehicleModel(data);
    await vehicleModel.save();

    return VehicleMapper.toDomain(vehicleModel);
  }

  async delete(id: string): Promise<Vehicle | null> {
    const deletedVehicle = await VehicleModel.findByIdAndDelete(id);

    if (!deletedVehicle) {
      return null;
    }

    return VehicleMapper.toDomain(deletedVehicle);
  }

  async getAll(): Promise<Vehicle[]> {
    const vehicles = await VehicleModel.find();

    return vehicles.map((vehicle) => VehicleMapper.toDomain(vehicle));
  }

  async getById(id: string): Promise<Vehicle | null> {
    const vehicle = await VehicleModel.findOne({ _id: id });

    if (!vehicle) {
      return null;
    }

    return VehicleMapper.toDomain(vehicle);
  }

  async update(vehicle: Vehicle): Promise<Vehicle | null> {
    const data = VehicleMapper.toPersistence(vehicle);
    const updatedVehicle = await VehicleModel.findByIdAndUpdate(
      vehicle.id,
      data,
      { new: true },
    );

    if (!updatedVehicle) {
      return null;
    }

    return VehicleMapper.toDomain(updatedVehicle);
  }
}
