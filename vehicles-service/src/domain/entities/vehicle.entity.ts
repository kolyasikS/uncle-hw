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
    public readonly adminId: string,
    public readonly photos?: string[],
  ) {}

  static create(createVehicleDto: CreateVehicleDto) {
    return new Vehicle(
      crypto.randomUUID(),
      createVehicleDto.make,
      createVehicleDto.model,
      createVehicleDto.year,
      createVehicleDto.user_id,
      createVehicleDto.admin_id,
    );
  }

  static update(existingVehicle: Vehicle, updateVehicleDto: UpdateVehicleDto) {
    return new Vehicle(
      existingVehicle.id,
      updateVehicleDto.make,
      updateVehicleDto.model,
      updateVehicleDto.year ?? existingVehicle.year,
      existingVehicle.userId,
      existingVehicle.adminId,
      updateVehicleDto.photos ?? existingVehicle.photos,
    );
  }
}
