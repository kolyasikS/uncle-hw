import type { VehicleService } from "@/application/services/vehicle.service.js";
import type { UserCreatedEvent } from "@/infrastructure/message-broker/events/user-created.event.js";

export class UserCreatedHandler {
  constructor(private readonly vehicleService: VehicleService) {}

  async handle(event: UserCreatedEvent): Promise<void> {
    console.log(event);
    await this.vehicleService.create({
      make: "unknown",
      model: "unknown",
      user_id: event.data.userId,
      year: null,
    });
  }
}
