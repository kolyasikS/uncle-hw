import type {
  CreateVehicleDto,
  UpdateVehicleDto,
} from "@/application/dto/vehicle.dto.js";

export class Vehicle {
  constructor(
    public readonly id: string,
    public readonly make: string,
    public readonly model: string,
    public readonly year: number | null,
    public readonly userId: string,
  ) {}

  static create(createVehicleDto: CreateVehicleDto) {
    return new Vehicle(
      crypto.randomUUID(),
      createVehicleDto.make,
      createVehicleDto.model,
      createVehicleDto.year,
      createVehicleDto.user_id,
    );
  }

  static update(existingVehicle: Vehicle, updateVehicleDto: UpdateVehicleDto) {
    return new Vehicle(
      existingVehicle.id,
      updateVehicleDto.make,
      updateVehicleDto.model,
      updateVehicleDto.year,
      existingVehicle.userId,
    );
  }
}
